<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease   icon_circle  iconfont  icon-jianhao" 
           v-show="goods.count>0" @click.stop.prevent="decreaseCart">
      </div>
    </transition>
    <div class="cart-count" v-show="goods.count>0">{{goods.count}}</div>
    <div class="icon_circle  iconfont icon-jiahao" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script>
  import Vue from 'vue';

  export default {
    props:['goods'],
    methods: {
      addCart(event) {
        this.goods.count++;
        this.$emit('add', event.target);
      },
      decreaseCart(event) {
        if (this.goods.count) {
          this.goods.count--;
        }
      }
    }
  };
</script>

<style scoped>
@import "../../assets/font/iconfont.css";
.cartcontrol{
    font-size: 0;
}

.icon_circle{
    color:#ed2d3c;
    display: inline-block;
    width:0.42rem;
    height:0.42rem;
    font-size:0.4rem;
}

.cart-decrease{
    font-size:0.36rem;
    opacity: 1;
    transform: translate3d(0, 0, 0);
}
.move-enter-active, .move-leave-active{
    transition: all 0.4s linear;
}
.move-enter, .move-leave-active{
    opacity: 0;
    transform: translate3d(0.24rem, 0, 0);
}

.cart-count{
    display: inline-block;
    vertical-align: top;
    min-width: 0.24rem;
    height:0.48rem;
    line-height:0.48rem;
    text-align: center;
    font-size: 0.26rem;
    color: rgb(147, 153, 159);
}



.inner{
    display: inline-block;
    line-height:0.48rem;
    font-size: 0.48rem;
    color: rgb(0, 160, 220);
    transition: all 0.4s linear;
    transform: rotate(0);
}
.inner{
    transform: rotate(180deg);
}
</style>