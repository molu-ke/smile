<template>
  <div class="goodsList">
     <div  v-for="(item,index) in goodsList"  :key="index" 
                  :class="'goodsbox flex-box mode'+mode"
                  @click="jumpDetails(item.goodsId,item.platform)">
        <van-swipe-cell :right-width="60" :disabled="shopCar==0">
          <img class="img" v-lazy="item.smallPic" :onerror="errorImg"/>
          <div class="flex-one info">
              <div class="title">
                {{item.goodsName}}</div>
              <template v-if="mode=='3-1-0-5'">
                <div class="quanSales">
                  <div class="quan" v-if="item.couponMoney!=0">
                    <span>券</span>
                    <span>￥{{item.couponMoney|moneyFilter(0)}}</span>
                  </div>
                  <div class="sales">销量: {{item.sales}} 件</div>
                  <div class="num clearfloat">
                    <p class="startPrice">原价￥{{item.price|moneyFilter(2)}}</p>
                    <span>￥{{item.endPrice|moneyFilter(2)}}</span>
                    <div v-if="role!=0 && shopCar==0">
                      <img src="../../assets/img/share.png"/>
                      赚￥{{item.commission}}
                    </div>
                    <div v-else-if="shopCar==1">
                         <cartcontrol @add="addFood"></cartcontrol>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else-if="mode=='3-1-0-6'">
                <div class="quanSales">
                  <div class="quan" v-if="item.couponMoney!=0">
                    <span>券</span>
                    <span>￥{{item.couponMoney|moneyFilter(0)}}</span>
                  </div>
                  <div class="sales">销量：{{item.sales}}</div>
                </div>
                <div class="startPrice">原价￥{{item.price|moneyFilter(2)}}</div>
                <div class="num clearfloat">
                  <span>￥
                    <span>{{item.endPrice|moneyFilter(2)}}</span>
                  </span>

                  <div v-if="role!=0&& shopCar==0">
                    <img src="../../assets/img/share.png"/>
                    赚￥{{item.commission}}
                  </div>
                  <div v-else-if="shopCar==1">
                    <cartcontrol @add="addFood" :goods="item"></cartcontrol>
                  </div>
                </div>
              </template>
          </div>
          <span slot="right" @click="onClose(index)">删除</span>
        </van-swipe-cell>
      </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import util from  "@/common/util.js";
import  cartcontrol from "@/components/component/cartcontrol"

export default {
  props: {
    goodsList: { type: Array },
    shopCar: { type:String,default:"0" },
  },
  data(){
    return{
      errorImg:'this.src="'+require('@/assets/img/errorimg.png')+'"',
    }
  },
  methods:{
    addFood(el){
      this.$emit("pilerDropEvent",el)
    },
    onClose(index){
      this.$emit("delGoodsEvent",index);
    },
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
  computed:{
    ...mapState(["mode","role"])
  },
  components:{
    cartcontrol
  },
  created(){
    // console.log(this)
  },
  filters:{
    moneyFilter(number,int){
      return util.moneyFilter(number,int);
    }
  }
}  
</script>

<style>
.goodsList{
  background:#f5f5f5;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0.2rem 0;
  box-sizing: border-box;
}

/*清除浮动*/

.clearfloat:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}

.clearfloat {
  zoom: 1;
}


/* 商品例表 */

.goodsbox {
  padding: 0.2rem 0.3rem;
  background: #fff;
  margin-top: 0.04rem;
      font-size: 0;
}

.goodsbox .img img {
  width: 2.2rem;
  height: 2.2rem;
}

.goodsbox .img {
  width: 2.2rem;
  height: 2.2rem;
  margin-right:0.2rem;
}

.goodsbox .noneimg {
  width: 2.2rem;
  height: 2.2rem;
  margin-right: 0.6rem;
}

.goodsbox .noneimg img {
  height: 100%;
  width: 100%;
}

.goodsbox .info {
  overflow: hidden;
  font-size: 0;
  display:inline-block;
  width: 4.5rem;
}

.goodsbox .info .title {
  font-size: 0.3rem;
  color: #333;
  margin-bottom: 0.12rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 0.4rem;
  margin-top: 0.06rem;
  display: inline-block;
  width: 100%;
}

.goodsbox .quanSales {
  margin-bottom: 0.36rem;
  font-size: 0.24rem;
  line-height: 0.36rem;
}

.goodsbox .info .quan {
  background: url("data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAAAeCAMAAACfSil3AAAAh1BMVEVHcEz/WiH/SAb/SAb/azf/ajb/WiD/SQb/ajf/WiH/azf/ajb/SQf/SQf/WiH/WiD/SAb/Sgn/URP/YSn/Vxv/WiD/TxD/ZzH/ajb/ZC3/Tg7/TAv/XyX/TQz/UxX/WR3/XSP/VBf/SQb/aDP/ZjD/Yyv/Vhn/ZS7/YCj/ZTD/XCL/aTT/XycuQkUAAAAAEXRSTlMAE60mscoH8PI+JubXuGmOwVM4XAkAAADPSURBVHja7dYJDoIwEEDRAYFSFgFRKTuWVfD+57NIgj3A1MSEf4CXSZumA3DSCY8+5XlelmWW3dcua1X1EA3DVVTX9U00z03TFEXxmqY4jvu+T9N0HJ9dlyRJ27bLsjBmG45wCefYsKAd0LkKmBlA1MA2cDUwO+AfwCFRAbsmANAQGzYpbAW4cAB7PiZswDeKCVOQIniwC3IeGsxM2bUQJ7YtycU8Y0Yl2MO8PHMfWfMjzImZoW3s2cN+ee5Zg+MH+WNY2eUpW1iUrVjKlsI3kHgTBxyQGnUAAAAASUVORK5CYII=") no-repeat;
  background-size: 100% 100%;
  display: inline-block;
  color: #fdf3ef;
  margin-right: 0.2rem;
}

.goodsbox .info .quan span:first-child {
  padding: 0 0.04rem 0 0.14rem;
}

.goodsbox .info .quan span:last-child {
  padding-right: 0.14rem;
}

.goodsbox .info .sales {
  color: #777;
  font-size: 0.24rem;
  display: inline-block;
  line-height: 0.36rem;
}

.goodsbox .info .startPrice {
  text-decoration: line-through;
  font-size: 0.24rem;
  color: #777;
  line-height: 0.32rem;
  margin-bottom: 0.08rem;
}

.goodsbox .info .num {
  position: relative;
  line-height: 0.44rem;
}

.goodsbox .info .num span:nth-of-type(1) {
  font-size: 0.34rem;
  color: #ed2d3c;
}

.goodsbox .info .num>div {
  font-size: 0.24rem;
  color: #ed2d3c;
  position: absolute;
  right: 0;
  bottom: 0rem;
}

.goodsbox .info .num div img {
  width: 0.62rem;
  height: 0.62rem;
  display: block;
  margin: 0 auto;
}

/* 回到顶部 */

.backTop {
  position: fixed;
  bottom: 1.24rem;
  right: 0.18rem;
  width: 0.76rem;
  height: 0.76rem;
  background: url("../../assets/img/icon_backTop.png");
  -webkit-background-size: 0.76rem 0.76rem;
  background-size: 0.76rem 0.76rem;
  background-repeat: no-repeat;
  background-position: 50%;
  z-index: 20;
}
/* mode2/mode3 */

.goodsbox.mode3-1-0-7 .quanSales {
  margin: 0.2rem 0 0 0;
}

.goodsbox.mode3-1-0-7 .info .num {
  margin-top: 0.56rem;
}

.goodsbox.mode3-1-0-7 .info .startPrice {
  margin-left: 0.06rem;
}

.goodsbox .lingquan {
  border: 1px solid #e84d74;
  border-radius: 5px;
  display: inline-block;
  color: #e84d74;
}

.goodsbox .lingquan text {
  display: inline-block;
  padding: 0.04rem 0.01rem;
}

.goodsbox .lingquan text:nth-of-type(1) {
  background: #e84d74;
  color: #fff;
}

/*3-1-0-5*/

.goodsbox.mode3-1-0-5 {
  padding: 0;
  width: 49%;
  float: left;
  margin-bottom: 0.16rem;
  flex-direction: column;
}

.goodsbox.mode3-1-0-5:nth-last-of-type(2n+1) {
  margin-left: 0.14rem;
}

.goodsbox.mode3-1-0-5 .img {
  width: 3.68rem;
  height: 3.68rem;
  margin: 0;
}

.goodsbox.mode3-1-0-5 .info {
  padding: 0.12rem 0 0.2rem 0.2rem;
}

.goodsbox.mode3-1-0-5 .quanSales {
  margin-bottom: 0;
}

.goodsbox.mode3-1-0-5 .info .num {
  margin-top: 0.3rem;
}

.goodsbox.mode3-1-0-5 .info .num span:nth-of-type(1) {
  font-size: 0.38rem;
  margin-left: -0.08rem;
}

.goodsbox.mode3-1-0-5 .share img {
  float: right;
  width: 0.45rem;
  height: 0.45rem;
  margin-right: 0.1rem;
}

.goodsbox.mode3-1-0-5 .info .num div img {
  width: 0.56rem;
  height: 0.56rem;
}

.goodsbox.mode3-1-0-5 .info .num div {
  right: 0.38rem;
  top: -0.12rem;
}

/* 清除button默认样式 */

.clearButtonStyle {
  overflow: visible;
  border-radius: 0;
  margin-left: 0;
  margin-right: 0;
  padding-left: 0;
  padding-right: 0;
  text-align: left;
  border: none !important;
}

/* 没团队 */

.none {
  color: #333;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -1.64rem;
  margin-left: -1.48rem;
}

.none img {
  width: 1.96rem;
  height: 1.71rem;
}

.none div:nth-child(2) {
  font-size: 0.3rem;
  padding: 0.2rem 0 0.2rem 0;
}

.none button {
  overflow: visible;
  margin-left: 0;
  margin-right: 0;
  text-align: left;
  font-size: 0.32rem;
  display: inline-block;
  border: 0.02rem solid #f18eac;
  border-radius: 0.4rem;
  padding: 0.1rem 0.34rem;
  line-height: 0.4rem;
}

/* 加载框 */

.loading {
  height: 0.9rem;
  line-height: 0.9rem;
  width: 100%;
  text-align: center;
  background: #fff;
}

.loading img {
  width: 0.5rem;
  height: 0.5rem;
}

/* 列表头部共用样式   commList*/

.commList .fixed {
  position: fixed;
  z-index: 111;
  width: 100%;
  top: 0;
}

.commList .swiper {
  width: 100%;
  height: 100%;
}

.commList .swiper img {
  height: 100%;
  width: 100%;
}

.commList .change {
  height: 0.35rem;
  width: 0.35rem;
}

/* 商品例表 */

.commList .selectList {
  display: flex;
  background: #fff;
  padding: 0.2rem 0.1rem 0.1rem 0;
  font-size: 0.6rem;
  justify-content: space-around;
  width: 100%;
}

.commList .selectList div {
  text-align: center;
  display: table;
  vertical-align: middle;
  font-size: 0.28rem;
  color: #333;
  padding-right: 0.28rem;
  background-size: 0.21rem 0.11rem;
}

.commList .selectList .select {
  color: #e84d74;
  font-size: 0.28rem;
  background-size: 0.21rem 0.11rem;
}

.commList .selectList .downArrow {
  color: #e84d74;
  font-size: 0.28rem;
  background-size: 0.21rem 0.11rem;
}

.commList .swiper .carousel {
  background: #fff;
  height: 0.5rem;
  line-height: 0.5rem;
  padding: 0 0.3rem;
  color: #333;
  text-align: left;
}


</style>
