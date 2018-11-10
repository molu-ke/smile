<template>
  <div>
    <van-tabs swipeable  v-model="active">
      <van-tab v-for="(item,idx) in nav" :title="item.name" :key="idx">
        <div class="menu-wrapper" ref="menuWrapper">
          <ul>
            <li v-for="(item,index) in classTitle" 
                class="menu-item" :class="{'active':index===currentIndex}" :key="index" 
                @click="selectMenu(index,$event)"
                ref="menuList"
            >
                <span class="text border-1px">
                    {{item.name}}
                </span>
            </li>
          </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
          <ul v-if="goodsList[active].length!==0">
            <li class="food-list" v-for="list in goodsList[active]" :key="list.time"
                ref="foodList">
              <h1 class="title">{{list.name}}</h1>
              <ul class="food-flex">
                <li class="food-detail" v-for="item in list.list" :key="item.goodsId">
                  <div class="goods-img">
                      <img v-lazy="item.smallPic" :onerror="errorImg">   
                  </div>
                  <div class="food-outer">
                      <div class="sub-title">{{item.goodsName}}</div>
                  <div class="price">
                      <span class="end-price">￥{{item.endPrice | moneyFilter(2)}}</span>
                      <span class="start-price">￥{{item.price| moneyFilter(2)}}</span>
                  </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import util from "@/common/util.js";
import BScroll from "better-scroll";

export default {
  data() {
    return {
      errorImg: 'this.src="' + require("@/assets/img/errorimg.png") + '"',
      nav: [
        { id: "美食", name: "九块九" },
        { id: "母婴", name: "超级券" },
        { id: "女装", name: "每日榜单" },
        { id: "衣服", name: "高额佣金" },
        { id: "美妆", name: "限时秒杀" },
        { id: "男装", name: "人气爆款" }
      ],
      classTitle: [
        { id: 1, name: "美食" },
        { id: 4, name: "母婴" },
        { id: 12, name: "水果" },
        { id: 16, name: "美妆" },
        { id: 18, name: "电器" },
        { id: 743, name: "男装" }
      ],
      goodsList: [],
      themeId: "美食",
      active: 0,
      listHeight: [], //记录每个标题的高度
      scrollY: 0, //滚动过的高度
      foodListDOM: [],
      menuWrapperDOM: [],
      foodsWrapperDOM: []
    };
  },
  created() {
    //优化性能
    this.nav.forEach((item, index) => {
      this.goodsList.push([]);
      this.listHeight.push([]);
      this.foodListDOM.push([]);
      this.menuWrapperDOM.push([]);
      this.foodsWrapperDOM.push([]);
    });
    this.getData(0);
  },
  methods: {
    getData(load) {
      if (this.goodsList[this.active].length !== 0) {
        //重新生成new BScroll
        this._initScroll();
        this._calculateHeight();
        return;
      }

      let pams = {
        key: this.themeId,
        st: 1
      };
      this.$request("/pdd/goods/search", pams, "GET", load, res => {
        let ground = [];
        this.classTitle.forEach((item, index) => {
          //数据分组
          this.goodsList[this.active].push({
            name: this.classTitle[index].name,
            time: Date.parse(new Date()) + index, //生成时间戳，防止:key重名
            list: res.list.slice(index, 6 + index)
          });
        });

        this.$nextTick(() => {
          //保存foodsWrapper跟foodsWrapper的节点信息
          this.menuWrapperDOM[this.active] = this.$refs.menuWrapper.pop();
          this.foodsWrapperDOM[this.active] = this.$refs.foodsWrapper.pop();
          this._initScroll();

          //因为是多个tab，所以定义变量，保存对应的$refs节点信息
          this.foodListDOM[this.active] = this.$refs.foodList.slice(-6);
          this._calculateHeight();
        });
      });
    },
    //给元素绑定BScroll对象
    _initScroll() {
      this.meunScroll = new BScroll(this.menuWrapperDOM[this.active], {
        click: true
      });
      this.foodsScroll = new BScroll(this.foodsWrapperDOM[this.active], {
        click: true,
        probeType: 3
      });

      //给商品绑定滚动事件
      this.foodsScroll.on("scroll", pos => {
        // 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
        if (pos.y <= 0) {
          //pos.y就是滚动过的高度
          this.scrollY = Math.abs(Math.round(pos.y));
        }
      });
    },
    //计算每个副标题的高度forEach
    _calculateHeight() {
      let height = 0;
      this.listHeight[this.active].push(height);
      let foodList = this.foodListDOM[this.active];
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight[this.active].push(height);
      }
    },
    //让左边跟随右边滚动
    _followScroll(index) {
      let menuList = this.$refs.menuList;
      let el = menuList[index];
      this.meunScroll.scrollToElement(el, 300, 0, -100);
    },

    //点击左侧导航栏，滑动到对应的地方
    selectMenu(index, event) {
      // if (!event._constructed) {
      //   return;
      // }
      let foodList = this.foodListDOM[this.active];
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    }
  },
  filters: {
    moneyFilter(number, int) {
      return util.moneyFilter(number, int);
    }
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight[this.active].length; i++) {
        let height1 = this.listHeight[this.active][i];
        let height2 = this.listHeight[this.active][i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          this._followScroll(i);
          return i;
        }
      }
      return 0;
    }
  },
  watch: {
    active() {
      this.themeId = this.nav[this.active].id;
      this.getData(1);
    }
  }
};
</script>

<style scoped>
.van-tab__pane {
  display: flex;
  position: absolute;
  top: 44px;
  bottom: 50px;
  width: 100%;
  overflow: hidden;
}
.menu-wrapper {
  flex: 0 0 1.12rem;
  font-size: 0.3rem;
  border-right: 3px solid #f3f5f7;
}
.menu-item {
  height: 0.9rem;
  width: 1.12rem;
  padding-left: 12px;
  line-height: 0.9rem;
  border-bottom: 2px solid #f3f5f7;
}
.current {
  position: relative;
  z-index: 10;
  margin-top: -1px;
  background: #fff;
  font-weight: 700;
}
.icon {
  display: inline-block;
  vertical-align: top;
  width: 12px;
  height: 12px;
  margin-right: 2px;
  background-size: 12px 12px;
  background-repeat: no-repeat;
}
.active {
  background: #f3f5f7;
}
.foods-wrapper {
  flex: 1;
  background: #f5f5f5;
}
.foods-wrapper .title {
  padding-left: 0.28rem;
  height: 0.52rem;
  line-height: 0.52rem;
  border-left: 2px solid #f44;
  font-size: 0.24rem;
  color: #f44;
  background: #fff;
}
.foods-wrapper .food-detail {
  width: 49.5%;
  background: #fff;
  font-size: 0.28rem;
  color: #f44;
  text-align: center;
  flex: none;
  margin-bottom: 0.1rem;
}
.foods-wrapper .food-flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}
.foods-wrapper .goods-img {
  width: 100%;
  height: 3rem;
  overflow: hidden;
}

.foods-wrapper .goods-img img {
  width: 100%;
}

.foods-wrapper .food-outer {
  padding: 0.1rem 0.2rem 0.26rem;
}
.foods-wrapper .sub-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  line-height: 0.4rem;
}
.foods-wrapper .price {
  padding-top: 0.1rem;
}
.foods-wrapper .end-price {
  font-size: 0.3rem;
}
.foods-wrapper .start-price {
  text-decoration: line-through;
  color: #999;
}
</style>