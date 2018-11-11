<template>
  <div class="goodsDetail">
    <van-nav-bar    
        left-text="返回"
        left-arrow
        fixed
        @click-left="onClickLeft"
        :title="goodsInfo.goodsName"/>
    <div v-show="goodsInfo!='none'">
      <!-- 轮播 -->
      <van-swipe :autoplay="3000"  class="swiper">
        <van-swipe-item v-for="(item, index) in goodsInfo.goodsGalleryUrls" :key="index">
          <img v-lazy="item" width="100%" />
        </van-swipe-item>
      </van-swipe>

      <!-- 内容 -->
      <div class="info">
        <div class="title">{{goodsInfo.goodsName}}</div>
        <div class="endPrice">
          <span class="present" v-if="goodsInfo.endPrice">
            <span>￥</span>{{goodsInfo.endPrice|moneyFilter(2)}}
          </span>
          <div class="quan"></div>
        </div>
        <div class="num">
          <div class="before" v-if="goodsInfo.price"> 
              原价:￥{{goodsInfo.price|moneyFilter(2)}}
          </div>
          <div class='buynum'>{{goodsInfo.sales}}人己买</div>
        </div>
        <div class='disTicket' v-if="goodsInfo.couponMoney!=0">
          <img src='../../assets/img/disTicket.png'/>
          <span class='yuan'>{{goodsInfo.couponMoney}}元优惠券</span>
          <span class='now'>立即领券</span>
        </div>
      </div>


     <!--店铺  -->
      <template v-if="goodsInfo.mallName">
        <div class='newDetails_info' >
          {{goodsInfo.mallName}}
          <span>进入店铺</span>
        </div>
      </template>


      <!--推荐词  -->
      <div class="recom clearfloat" v-if="goodsInfo.goodsDesc!=''">
        <span>推荐词</span>
        <span >{{goodsInfo.goodsDesc}}</span>
      </div>

        <!--猜你喜欢  -->
        <div class='guess'>
          <img src='../../assets/img/guess.png' />
        </div>
        <swiper :options="swiperOption">
          <swiper-slide v-for=" (item ,index) in guessList" :key="index">
            <div class="recommend-item" 
                 @click="jumpDetails(item.goodsId,item.platform)">
              <img  v-lazy="item.smallPic" :onerror="errorImg"
                   class="item_img"/>
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

      <div class="bottom">----我是有底线的----</div>

      <van-goods-action>
        <van-goods-action-mini-btn icon="chat" 
          text="首页"  @click="jumpPage(0)"/>
        <van-goods-action-mini-btn icon="cart" 
          text="购物车" @click="jumpPage(1)"/>
        <van-goods-action-mini-btn icon="shop" text="分享" />
        <van-goods-action-big-btn text="加入购物车" @click="addShopCar"/>
        <van-goods-action-big-btn text="立即购买" primary @click="buy"/>
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import util from "@/common/util.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
export default {
  data(){
    return{
      swiperOption: {
        slidesPerView: 3
      },
      goodsInfo:'none',
      guessList:[],
      errorImg:'this.src="'+require('@/assets/img/errorimg.png')+'"',
    }
  },
  methods: {
    //购买
    buy() {
      let pams = {
        goodsId: this.$route.query.goodsId,
        goodsName: this.goodsInfo.goodsName,
        price: this.goodsInfo.price,
        endPrice: this.goodsInfo.endPrice,
        couponMoney: this.goodsInfo.couponMoney,
        ifQw: 0,
        ifBuy: 1,
        goodsImg: this.goodsInfo.goodsGalleryUrls[0],
        platform: this.goodsInfo.platform,
        openType: 1,
        deviceId: "/mini",
      };
      this.$request('share/pddPromotion', pams, 'GET', 1, (res)=> {
       window.location.href =res.url
      })
    },

    //收藏
    addShopCar() {
      let pamss = {
        goodsId: this.$route.query.goodsId,
        goodsName: this.goodsInfo.goodsName,
        goodsPic: this.goodsInfo.goodsGalleryUrls[0],
        smallPic: this.goodsInfo.goodsGalleryUrls[1],
        price: this.goodsInfo.price,
        endPrice: this.goodsInfo.endPrice,
        couponMoney: this.goodsInfo.couponMoney,
        commission: this.goodsInfo.commission,
        sales: this.goodsInfo.sales,
        platform: this.goodsInfo.platform,
        src: 0,
        activatyId: ""
      };
     this.$request("userGoods/save", pamss, "GET", 0, (res)=> {
        this.$toast('加入购物车成功');
      });
    },

    //商品详情
    getData(load){
      let pams = {
        goodsId:this.$route.query.goodsId,
        platform: this.$route.query.platform,
        deviceId: "/mini"
      };
      this.$request("pdd/goods/detail", pams, "GET", load, res => {
        this.goodsInfo=res;
        this.getGuess();
      })
    },

    //猜你喜欢
    getGuess(){
      let pams = {
        catId: 16,
        st: 1
      };
      this.$request("pdd/goods/list", pams, "GET", 0, res => {
        this.guessList = res.list;
      });
    },

    jumpPage(idx){
      if(idx==0){
        this.$router.push({name:'Store'})
      }else{
        this.$router.push({name:'ShopCar'})
      }
    },

    //跳到详情页
    jumpDetails(goodsId,platform){
      console.log(23)
      this.$router.replace({
        name:"GoodsDetail",
        query:{
          goodsId:goodsId,
          platform:platform
        }
        // params参数会被 忽略
      })
      this.getData(1);
    },

    //返回上一级
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  components: {
    swiper,
    swiperSlide,
  },
  created(){
    this.getData(0);
  },
  filters:{
    moneyFilter(number,int){
      return util.moneyFilter(number,int);
    }
  }
};
</script>

<style scoped>
.goodsDetail {
  font-size: 0;
  background: #f5f5f5;
  margin-bottom: 1.2rem;
  margin-top: 46px;
}
.swiper {
  width: 100%;
  height: 7.5rem;
  overflow: hidden;
}
.info {
  padding: 0 0.24rem;
  font-size: 0.28rem;
  padding-bottom: 0.16rem;
  background: #fff;
}
.info .title {
  font-size: 0.32rem;
  color: #333;
  padding-bottom: 0.2rem;
  line-height: 0.46rem;
  padding-top: 0.14rem;
}
.info .present {
  font-size: 0.51rem;
  color: #ed2d3c;
  position: relative;
  top: -0.08rem;
}
.info .present span {
  font-size: 0.28rem;
}

.info .quan {
  display: inline-block;
  font-size: 0.2rem;
  width: 0.82rem;
  height: 0.28rem;
  background: url("../../assets/img/ico_details_samll_quan.png") no-repeat;
  background-size: 100% 100%;
  margin-left: 0.12rem;
  position: relative;
  top: -0.13rem;
}

.info .num {
  color: #666;
  font-size: 0.26rem;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.2rem;
}
.info .before {
  text-decoration: line-through;
  display: inline-block;
  color: #666;
  font-size: 0.26rem;
}
.disTicket {
  width: 95%;
  height: 1.3rem;
  margin: 0 auto;
  position: relative;
}
.disTicket img {
  width: 100%;
  height: 100%;
  z-index: 999;
}
.yuan {
  position: absolute;
  top: 57%;
  transform: translate(-50%, -50%);
  left: 28%;
  color: white;
  font-size: 0.36rem;
  height: 50%;
  text-align: center;
  width: 80%;
}
.now {
  position: absolute;
  top: 52%;
  transform: translateY(-50%);
  right: 0.4rem;
  color: white;
  width: 20%;
  height: 100%;
  font-size: 0.3rem;
  line-height: 1.3rem;
}
.newDetails_info {
  line-height: 0.74rem;
  padding: 0 0.3rem;
  margin: 0.2rem 0;
  color: #333;
  font-size: 0.28rem;
  background: #fff
    url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAeCAMAAAD95QUdAAAAJ1BMVEVHcEyZmZmampqZmZmYmJiZmZmYmJiZmZmZmZmXl5ebm5uZmZmZmZnnvE6KAAAADHRSTlMARRLwG95W5U0iOcjEYRwyAAAAX0lEQVR42o2QSxLAMAhCY0iaT7n/edut6DR1+QaEoZR9FX9GmhAEVEFuj9oIqtXJKarEiGhEYkzfWywxj1VXUvUmZYmLhILeFFTZbjgw/wDUY0rTlHOx71hTxbsAPHgAeVYETIoxqhMAAAAASUVORK5CYII=")
    no-repeat 7rem center;
  background-size: 0.17rem 0.3rem;
}
.newDetails_info span {
  float: right;
  font-size: 0.22rem;
  color: gray;
  margin-right: 0.42rem;
}
.recom {
  padding: 0.2rem 0.24rem;
  display: flex;
  background-color: white;
}
.recom span:first-child {
  flex: 0 0 0.75rem;
  color: #e84d74;
  font-size: 0.2rem;
  height: 0.3rem;
  margin-right: 0.16rem;
  border: 0.02rem solid #e84d74;
  border-radius: 0.06rem;
  padding: 0.02rem;
  line-height: 0.34rem;
  text-align: center;
}
.recom span:last-child {
  flex: 1 1 auto;
  color: #666;
  font-size: 0.24rem;
  width: 85%;
  text-align: justify;
  overflow: hidden;
}

.guess {
  height: 0.8rem;
  width: 100%;
  margin-top: 0.24rem;
}

.guess img {
  width: 100%;
  height: 100%;
}


.head_box {
  font-size:0;
  margin: 0.2rem 0.3rem;
  background: #fff url("../../assets/img/ioc_index_arraw.png") no-repeat right
   center;
  background-size: 0.1rem 0.2rem;
}
.item_img {
  width:100%;
}

.item_span {
  height: 0.7rem;
  background-color: white;
  margin-top: 0.1rem;
}

.item_span .item_price{
  font-size:0;
}

.item_span .item_info {
  padding: 0.03rem 0.03rem;
  font-size: 0.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 0.26rem;
}

.goods_type {
  font-size: 0.3rem;
}

.look_more {
  padding-right: 0.28rem;
  padding-top: 0.02rem;
  font-size: 0.24rem;
  color: #9a9a9a;
  float: right;
}

.arrow_right img {
  width: 0.2rem;
  height: 0.2rem;
  vertical-align: top;
}

.dis_price {
  color: red;
  font-size: 0.24rem;
  margin-right: 0.18rem;
}

.price {
  text-decoration: line-through;
  color: #909090;
  font-size: 0.18rem;
}
.swiper-container{
  padding-left:0.3rem;
  background:#fff;
}
.recommend-item{
  font-size:0;
  margin-right:0.3rem;
}
.van-goods-action{
  z-index:1000
}
</style>