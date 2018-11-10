import Vue from 'vue'
import Router from 'vue-router'
import Tab from '@/components/pages/Tab'
import Store from '@/components/pages/Store'
import Classification from '@/components/pages/Classification'
import ShopCar from '@/components/pages/ShopCar'
import Home from '@/components/pages/Home'
import GoodsDetail from '@/components/pages/goodsDetail'
import Study from '@/components/pages/Study'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Tab',
      component: resolve => require(['@/components/pages/Tab'], resolve),
      children:[
        //商城
        {
          path: '/',
          redirect: '/Store',
        },
        {
          path: '/Store',
          name: 'Store',
          component: resolve => require(['@/components/pages/Store'], resolve)
        },
        //分类
        {
          path: '/Classification',
          name: 'Classification',
          component: resolve => require(['@/components/pages/Classification'], resolve),
        },
        //我的
        {
          path: '/Home',
          name: 'Home',
          component: resolve => require(['@/components/pages/Home'], resolve),
        }
      ]
    },
    //购物车
    {
      path: '/ShopCar',
      name: 'ShopCar',
      component: resolve => require(['@/components/pages/ShopCar'], resolve),
    },
    //商品详情页
    {
      path: '/GoodsDetail',
      name: 'GoodsDetail',
      component: resolve => require(['@/components/pages/goodsDetail'], resolve),
    },
    //自己用于学习的页面
    {
      path: '/Study',
      name: 'Study',
      component: resolve => require(['@/components/pages/Study'], resolve),
    }
  ]
})
