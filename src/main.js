// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store/store'
import App from './App'
import router from './router'
import util from  "@/common/util.js"
import request from '@/common/fetch'

Vue.config.productionTip = false
Vue.prototype.$store=store;
Vue.prototype.$util = util;
Vue.prototype.$request = request;

import {Swipe, SwipeItem,Tabbar, TabbarItem,Lazyload,PullRefresh,List,Tab, Tabs,NavBar,SwipeCell,cellGroup,GoodsAction,GoodsActionBigBtn,
GoodsActionMiniBtn} from 'vant';
Vue.use(Swipe).use(SwipeItem).use(Tabbar).use(TabbarItem).use(PullRefresh).use(List).use(Tab).use(Tabs).use(NavBar).use(SwipeCell).use(cellGroup).use(GoodsAction).use(GoodsActionBigBtn).use(GoodsActionMiniBtn)
.use(Lazyload,{
  error: require("./assets/img/dproimg.png"),
  loading: require("./assets/img/dproimg.png")
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
