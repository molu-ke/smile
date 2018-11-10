<template>
    <div class="shopcar_wrapper">
        <van-nav-bar    
        left-text="返回"
        left-arrow
        fixed
        @click-left="onClickLeft"
        title="购物车"/>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
                v-model="loading"
                :finished="finished"
                @load="pullUp"
            >
            <goodsList  :goodsList="goodsList" shopCar="1" 
                        @pilerDropEvent="pilerDrop"
                        @delGoodsEvent="delGoods"
                        ></goodsList>
            </van-list>
             <div class="bottom" v-show="finished">----我是有底线的----</div>
        </van-pull-refresh>
        
        
        <!-- 底部购物栏 -->
        <div class="shopcart" >
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'highlightBg':totalCount>0}">
                        <i class="iconfont icon-ai-cart"
                           :class="{'highlight':totalCount>0}"></i>
                    </div>
                    <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                </div>
                <div class="price" :class="{'highlight':totalPrice>0}">
                    ￥{{totalPrice|moneyFilter(2)}}
                </div>
                <div class="desc">{{deliveryDes}}</div>
            </div>
            <div class="content-right">
                <div class="pay" :class="payClass">
                    去结算
                </div>
            </div>
        </div>

        <!-- 落下的小球 -->
        <div class="ball-container">
            <div v-for="(ball,index) in balls" :key="index">
            <transition name="drop" @before-enter="beforeDrop" 
                        @enter="dropping" @after-enter="afterDrop">
                <div class="ball" v-show="ball.show">
                    <div class="inner inner-hook"></div>
                </div>
            </transition>
            </div>
         </div>
    </div>
</template>

<script>
import util from "@/common/util.js";
import goodsList from "@/components/component/goodsList";
export default {
  data() {
    return {
      goodsList: [],
      p: 0,
      errorImg: 'this.src="' + require("@/assets/img/errorimg.png") + '"',
      balls: [{show:false},{show: false},{show: false},{show: false},{show: false}],
      dropBalls: [],
      fold: true,
      deliveryPrice:20,//配送费
      isLoading: false,//下拉刷新
      //上拉加载
      loading: false,
      finished: false,
    };
  },
  components: {
    goodsList
  },
  computed:{
      totalPrice(){
          let total = 0;
          this.goodsList.forEach((item)=>{
              total+=item.count*item.endPrice
          })
          return total;
      },
      totalCount(){
        let total = 0;
          this.goodsList.forEach((item)=>{
              total+=item.count
          })
          return total;
      },
      payClass(){
        if(this.totalCount>0){
            return "enough"
        }
        return 'not-enough';
      },
      deliveryDes(){
          if(this.deliveryPrice>=this.totalPrice){
              return `另需配送费${this.deliveryPrice}元`
          }
          return `免配送费`;
      }
  },
  methods: {
    //获取购物车数据
    getData: function(page, load) {
      let pams = {
        page: this.p,
        deviceId: "/mini"
      };
      this.$request("userGoods/list", pams, "GET", 0, res => {
         if (res.list.length == 0) {
           this.loading = false;
          this.finished = true;
          return;
        } 
        // 数据处理 新增一个count字段
        res.list.forEach((item)=>{
            item.count=1
        })
        if(page==1){
            this.isLoading = false;
            this.goodsList =res.list;
        }else{
            this.loading = false;
            this.goodsList = this.goodsList.concat(res.list);
        }
        
        
      });
    },

    //删除购物车商品
    delGoods: function(index) {
      let pams = {
        goodsId:this.goodsList[index].goodsId,
        platform: this.goodsList[index].platform
      };
      this.$request("userGoods/del", pams, "GET", 0, res => {});
      this.goodsList.splice(index,1);
    },

    onRefresh() {
      this.p=1;
      this.getData(1,0);
    },

     pullUp(){
      this.p++;
      this.getData(0, 1);
    },

    // 下落的小球事件
    pilerDrop(el){
        this.drop(el);
    },
    drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
            let ball = this.balls[i];
            if (!ball.show) {
                ball.show = true;
                ball.el = el;
                this.dropBalls.push(ball);
                return;
            }
        }
    },
    beforeDrop(el) {
        let count = this.balls.length;
        while (count--) {
            let ball = this.balls[count];
            if (ball.show) {
                let rect = ball.el.getBoundingClientRect();
                let x = rect.left - 32;
                let y = -(window.innerHeight - rect.top - 22);
                el.style.display = '';
                el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                el.style.transform = `translate3d(0,${y}px,0)`;
                let inner = el.getElementsByClassName('inner-hook')[0];
                inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                inner.style.transform = `translate3d(${x}px,0,0)`;
            }
        }
    },
    dropping(el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
            el.style.webkitTransform = 'translate3d(0,0,0)';
            el.style.transform = 'translate3d(0,0,0)';
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = 'translate3d(0,0,0)';
            inner.style.transform = 'translate3d(0,0,0)';
            el.addEventListener('transitionend', done);
        });
    },
    afterDrop(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
            ball.show = false;
            el.style.display = 'none';
        }
    },
   

    //返回上一级
    onClickLeft() {
      this.$router.go(-1);
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
@import "../../assets/font/iconfont.css";
.shopcar_wrapper{
    margin-bottom:1.2rem;
    margin-top:46px;
}
.shopcart{
    position:fixed;
    left:0;
    bottom:0;
    width:100%;
    display: flex;
    background: #141d27;
    font-size: 0;
    color: rgba(255, 255, 255, 0.4);
}
.content-left{
    flex: 1;
}    
.logo-wrapper{
    display: inline-block;
    vertical-align: top;
    position: relative;
    top: -0.2rem;
    margin: 0 0.24rem;
    padding: 0.12rem;
    width: 1.12rem;
    height: 1.12rem;
    box-sizing: border-box;
    border-radius: 50%;
    background: #141d27;
}
.logo{
    width: 100%;
    height: 100%;
    line-height:0.86rem;
    border-radius: 50%;
    text-align: center;
    background: #2b343c;
}
.icon-ai-cart{
    font-size: 0.46rem;
}
.icon-shopping_cart{
    line-height: 0.88rem;
    font-size: 0.48rem;
    color: #80858a;
}
.highlight{
     color: #fff;
}
.num{
    position: absolute;
    top: 0;
    right: 0;
    width: 0.48rem;
    height: 0.32rem;
    line-height:0.32rem;
    text-align: center;
    border-radius:0.32rem;
    font-size: 0.18rem;
    font-weight: 700;
    color: #fff;
    background: rgb(240, 20, 20);
    box-shadow: 0 0.08rem 0.16rem 0 rgba(0, 0, 0, 0.4);
}       
.price{
    display: inline-block;
    vertical-align: top;
    min-width:1.6rem;
    padding-right:0.3rem;
    margin-top: 0.3rem;
    line-height: 0.48rem;
    box-sizing: border-box;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.34rem;
    font-weight: 700;
}
.highlight{
    color: #fff;
}
            
.desc{
    display: inline-block;
    vertical-align: top;
    margin: 0.3rem 0 0 0.24rem;
    line-height: 0.48rem;
    font-size:0.2rem;
}
    
.content-right{
    flex: 0 0 1.8rem;
    width: 1.8rem;
    background: #2b333b;
}

.pay{
    height:1.12rem;
    line-height:1.12rem;
    text-align: center;
    font-size:0.26rem;
    font-weight: 700;
}
.not-enough{
    background: #2b333b;
}
.enough{
    background: #00b43c;
    color: #fff;
}
.highlightBg{
    background:rgb(0, 160, 220);
}
.ball-container .ball{
    position: fixed;
    left:0.64rem;
    bottom:0.64rem;
    z-index: 200;
    transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
}
.inner{
    width:0.32rem;
    height: 0.32rem;
    border-radius: 50%;
    background: #ed2d3c;
    transition: all 0.4s linear;
}
          
</style>