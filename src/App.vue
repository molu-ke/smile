<template>
  <div id="app">
    <keep-alive include='Tab'>
        <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.bottom {
  margin: 0.16rem 0;
  text-align: center;
  color: #777;
  font-size:0.3rem;
}
/* 重置vant样式 */
.van-toast--text {
  min-width: auto;
}
.van-toast--default {
    width: 70px;
    height:70px;
    min-height: 70px;
    padding: 15px;
}
.van-tabbar-item__icon{
    margin-bottom:0;
}
.van-tabs__content{
        height: calc(100vh - 44px);
}
.van-swipe-cell__right{
  width:100%;
  height:100%;
  background:red;
  display:flex;
  align-items:center;
  margin-left:0.2rem;
}
.van-swipe-cell__right span{
  color:#fff;
  font-size:0.4rem;
  margin-left:0.2rem;
}
</style>
