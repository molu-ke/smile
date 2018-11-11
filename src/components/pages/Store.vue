<template>
  <div class="index"> 
       <!--顶部搜索框-->
    <div class='inp_box'>
        <img :src="user.headImg" class='userimg'/>
        <div class='seekbox'>
        <img src='../../assets/img/seekbox.png'  @click="sendSeek()"/>
        <input class='inp_search' placeholder="搜索宝贝、领券省钱、分享赚钱"   v-model="sendMsg" />
        <div v-if="showDelCont" class="delete" @click="delCont()"></div>
        </div>
        <button class="indexShare">分享</button>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="pullDown">
    <!-- 轮播 -->
    <van-swipe :autoplay="3000"  class="swiper">
      <van-swipe-item v-for="(item, index) in bannerList" :key="index">
        <img v-lazy="item.img" width="100%" />
      </van-swipe-item>
    </van-swipe>

    <!-- 第一层 -->
   <div class="g-navbox1 clearfloat">
        <div class="mo_nav" @click='list(1,"9块9")'>
        <img src="../../assets/img/nav1.png" />
        <span>9块9</span>
        </div>
        <div class="mo_nav"  @click='list(2,"限时秒杀")'>
        <img src="../../assets/img/nav2.png" alt="" />
        <span>限时秒杀</span>
        </div>
        <div class="mo_nav" @click='list(3,"高额佣金")'>
        <img src="../../assets/img/nav3.png" alt="" />
        <span>高额佣金</span>
        </div>
        <div class="mo_nav"  @click='list(4,"超级券")'>
        <img src="../../assets/img/nav4.png" alt="" />
        <span>超级券</span>
        </div>
        <div class="mo_nav" @click='list(5,"今日榜单")'>
        <img src="../../assets/img/nav5.png" alt="" />
        <span>今日榜单</span>
        </div>
    </div>
    <!-- 第三层 -->
    <div class="g-navbox3"  @click='list(9,"人气爆款")' >
      <img  src="../../assets/img/infantMom.png"/>
    </div>
    <!-- 第四层 -->
    <div class='scan_more g-navbox4'>
      <!--信息  -->
      <div class='head_box'>
        <span class='goods_type'>美妆护肤</span>
        <span class='look_more' @click='list(10,"美妆护肤")'>查看更多</span>
      </div>
      <swiper :options="swiperOption">
        <swiper-slide v-for=" (item ,index) in slideList" :key="index">
            <div class="recommend-item"  
                @click="jumpDetails(item.goodsId,item.platform)">
              <img  :onerror="errorImg" class="item_img"
                    v-lazy="item.smallPic?item.smallPic:'../../assets/img/dproimg.png'" 
              />
              <div class='item_span'>
                <div class='item_info'>{{item.goodsName}}</div>
                <div class='item_price'>
                <span class='dis_price'>
                  ￥<span>{{item.endPrice|moneyFilter(2)}}</span> 
                </span>
                <span class='price'>￥<span>{{item.price|moneyFilter(2)}}</span> </span>
                </div>
              </div>
            </div>
        </swiper-slide>
      </swiper>
    </div> 
    <!--第五层  精品推荐-->
    <div class="layout5">
        <div class="navTitle">精品推荐</div>
        <van-list
          v-model="loading"
          :finished="finished"
          @load="pullUp"
        >
          <goodsList  :goodsList="goodsList"></goodsList>
        </van-list>
    </div>
    <div class="bottom" v-show="finished">----我是有底线的----</div>
     </van-pull-refresh>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import util from  "@/common/util.js"
import goodsList from "@/components/component/goodsList";

export default {
  name: 'Store',
  data() {
    return {
      swiperOption: {
        slidesPerView: 3.4
      },
      errorImg:'this.src="'+require('@/assets/img/errorimg.png')+'"',
      loading: false,
      finished: false,
      st: 0,
      isLoading: false,
      bannerList: [],
      slideList: [],
      goodsList: [],


      sendMsg:'',
      showDelCont:false,
    };
  },


  components: {
    goodsList,
    swiper,
    swiperSlide,
  },
  computed: {
    ...mapState(["user"])
  },
  created() {
    this.getAdvert();
    this.beautyData();
  },
    
  methods: {
    //轮播广告
    getAdvert: function() {
      let pams = {
        categoryId: 1,
        deviceId: "/mini"
      };
      this.$request("advert/list", pams, "GET", 0, res => {
        this.bannerList = res.list;
      });
    },
    //美妆护肤
    beautyData: function() {
      let pams = {
        catId: 16,
        st: 1
      };
      this.$request("pdd/goods/list", pams, "GET", 0, res => {
        this.slideList = res.list;
      });
    },

    //商品例表
    getData: function(page, load) {
      let that = this;
      let pams = {
        themeId: 1,
        st: this.st,
        deviceId: "/mini"
      };
      this.$request("pdd/goods/list", pams, "GET", load, res => {
        if (res.list.length == 0 && page == 99) {
           this.loading = false;
          this.finished = true;
          return;
        } else if (res.list.length == 0 && page == 100) {
         this.isLoading = false;
        }
        this.loading = false;
        if (page == 99) {
          that.goodsList = that.goodsList.concat(res.list);
        } else {
          this.isLoading = false;
          that.goodsList = res.list;
        }
      });
    },
    //上拉加载
    pullUp: function() {
      this.st++;
      this.getData(99, 0);
    },

    //下拉刷新
    pullDown(){
      this.getAdvert();
      this.beautyData();
      this.st=0;
      this.getData(100, 0);
    },

    //跳到详情页
    jumpDetails(goodsId,platform){
      this.$router.push({
        name:"GoodsDetail",
        query:{
          goodsId:goodsId,
          platform:platform
        }
        // params参数会被 忽略
      })
    }
  },
  filters:{
    moneyFilter(number,int){
      return util.moneyFilter(number,int);
    }
  }
};
</script>

<style scoped>
.index{
  margin-bottom:60px;
}
.delete {
  position: absolute;
  width: 0.34rem;
  height: 0.34rem;
  right: 0.18rem;
  top: 0.19rem;
  z-index: 20;
  background: url("../../assets/img/del.png") no-repeat;
  background-size: 0.34rem;
}

.advertis {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.adInfo {
  height: 5.22rem;
  width: 7rem;
}

.adBox {
  position: absolute;
  top: 50%;
  left: 51%;
  transform: translate(-50%, -50%);
}

.adInfo img {
  height: 100%;
  width: 100%;
}

.cut {
  position: absolute;
  top: 30%;
  left: 80%;
  height: 0.5rem;
  width: 0.5rem;
  transform: translate(-50%, -50%);
  z-index: 999;
}

.cut img {
  height: 100%;
  width: 100%;
}

/*固定模块  */

.super {
  width: 93%;
  height: 2rem;
  margin: 0 auto;
  background-color: red;
}

/*顶部搜索框  */

.index .inp_box {
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  background-color: white;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  display: flex;
  padding-top:0.2rem;
}

.index .inp_box .seekbox {
  width: 5.1rem;
  height: 0.7rem;
  border-radius: 0.5rem;
  background-color: #efeef4;
  overflow: hidden;
  position: relative;
  flex: 1;
  font-size: 0;
}

.index .inp_box .userimg {
  width: 0.68rem;
  height: 0.68rem;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 0.3rem;
}

.index .inp_box .indexShare {
  font-size: 0.24rem;
  overflow: visible;
  border-radius: 0;
  text-align: center;
  margin-right: 0.3rem;
  margin-left: 0.14rem;
  padding-left: 0;
  padding-right: 0;
  padding-top: 0.26rem;
  border: none !important;
  width: 0.68rem;
  height: 0.68rem;
  color: gray;
  background: url("../../assets/img/ico_share.png") no-repeat top center;
  background-size: 0.38rem 0.38rem;
}

.index .inp_box .seekbox input {
  height: 0.7rem;
  line-height: 0.7rem;
  margin: 0 0.2rem 0 0.6rem;
  font-size: 0.28rem;
  background-color:#efeef4;
  width:4.1rem;
  border:none;
}

.index .inp_box .seekbox img {
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  left: 0.26rem;
  top: 0.21rem;
}

/* 轮播图 */

.index .swiper {
  width: 7.5rem;
  height: 3rem;
  margin-top: 1.1rem;
  background: #fff;
}
/* 第一层 图标*/

.g-navbox1 {
  width: 100%;
  background: #fff;
}

.g-navbox1 .mo_nav {
  width: 18.5%;
  float: left;
  margin: 1px 0 1px 1.25%;
  font-size: 0;
  padding: 0.14rem 0;
  text-align: center;
}

.g-navbox1 .mo_nav img {
  display: block;
  width: 0.76rem;
  height: 0.76rem;
  margin: 0 auto 0.1rem;
}

.g-navbox1 .mo_nav span {
  color: #333;
  font-size: 0.26rem;
}

/* 第四层 */

.g-navbox2 {
  width: 100%;
  background: #fff;
  margin-bottom: 0.04rem;
  overflow: hidden;
  border-bottom: 0.15rem solid #f5f5f5;
}

.g-navbox2 .left {
  width: 40%;
  float: left;
  height: 4.12rem;
  border: 1px solid #f5f5f5;
  padding: 0.16rem;
  overflow: hidden;
}

.g-navbox2 .right {
  float: left;
  width: 60%;
  height: 4.12rem;
}

.g-navbox2 .right .layout2 {
  width: 100%;
  height: 2.06rem;
  padding: 0.16rem;
  position: relative;
  border: 1px solid #f5f5f5;
}

.g-navbox2 .right .layout2 img {
  position: absolute;
  right: 0.3rem;
  bottom: 0;
  width: 1.8rem;
  height: 1.8rem;
}

.g-navbox2 .right .layout3 {
  padding: 0.1rem 0 0 0.1rem;
  width: 50%;
  float: left;
  height: 2.36rem;
  border: 1px solid #f5f5f5;
}

.g-navbox2 .right .layout3 img {
  width: 2.1rem;
  margin: 0.16rem auto 0;
  height: 1.32rem;
}

.g-navbox2 .layout5 {
  width: 100%;
  height: 2rem;
  border: 1px solid #ececec;
  position: relative;
}

.t1 {
  font-size: 0.3rem;
  color: #ed2d3c;
  padding-bottom: 0.06rem;
}

.t2 {
  font-size: 0.24rem;
  color: #666;
  line-height: 0.28rem;
}

.g-navbox2 .left img {
  width: 2.88rem;
  margin: 0.34rem auto 0;
}

.g-navbox2.g-navbox5 .left img {
  margin: 0.56rem auto 0;
}

/* 第三层 第五层*/

.g-navbox3 {
  border-bottom: 0.15rem solid #f5f5f5;
  border-top: 0.15rem solid #f5f5f5;
  width: 100%;
}

.g-navbox3 img{
  width:100%;
}

/* 第四层 */

.g-navbox4 {
  background-color: white;
  border-bottom: 0.15rem solid #f5f5f5;
  overflow: hidden;
}

.g-navbox4 .head_box {
  font-size:0;
  margin: 0.2rem 0.3rem;
  background: #fff url("../../assets/img/ioc_index_arraw.png") no-repeat right
   center;
  background-size: 0.1rem 0.2rem;
}
.g-navbox4 .item_img {
  width: 1.96rem;
  height: 1.96rem;
}

.item_span {
  width: 1.8rem;
  height: 0.7rem;
  background-color: white;
  margin-top: 0.1rem;
}

.item_span .item_price{
  font-size:0;
}

.g-navbox4 .item_span .item_info {
  padding: 0.03rem 0.03rem;
  font-size: 0.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 0.26rem;
}

.g-navbox4 .goods_type {
  font-size: 0.3rem;
}

.look_more {
  padding-right: 0.28rem;
  padding-top: 0.02rem;
  font-size: 0.24rem;
  color: #9a9a9a;
  float: right;
}

.g-navbox4 .arrow_right img {
  width: 0.2rem;
  height: 0.2rem;
  vertical-align: top;
}

.g-navbox4 .dis_price {
  color: red;
  font-size: 0.24rem;
  margin-right: 0.18rem;
}

.g-navbox4 .price {
  text-decoration: line-through;
  color: #909090;
  font-size: 0.18rem;
}
.swiper-container{
  margin-left:0.3rem;
}
.recommend-item{
  font-size:0;
}
/* 第五层   精品推荐 */

.layout5 {
  width: 100%;
}

.layout5 .navTitle {
  height: 0.88rem;
  width: 100%;
  text-align: center;
  line-height: 0.88rem;
  font-size: 0.35rem;
  border-bottom: 0.1rem solid #f5f5f5;
  background: #fff url("../../assets/img/ico_index_bg.png") no-repeat 47% 62%;
  background-size: 2.7rem 0.38rem;
}

.userBuy {
  position: absolute;
  line-height: 0.58rem;
  top: 0.12rem;
  left: 0.1rem;
  width: 0.54rem;
  height: 0.6rem;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 0.12rem;
  padding-left: 0.1rem;
  opacity: 0;
  animation: opci 9s infinite;
  z-index: 999;
}

.userBuy .buyImg {
  margin-right: 0.12rem;
  margin-left: 0.08rem;
}

.buyImg {
  height: 0.4rem;
  width: 0.4rem !important;
  display: inline-block;
  border-radius: 50%;
  margin-right: 0.2rem;
}

.buyImg img {
  height: 100%;
  width: 100%;
  vertical-align: middle;
}

.buyName {
  color: white;
  vertical-align: middle;
}
</style>
