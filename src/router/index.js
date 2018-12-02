import Vue from 'vue'
import Router from 'vue-router'
import Tab from '@/components/pages/Tab'
import Store from '@/components/pages/Store'
import Classification from '@/components/pages/Classification'
import ShopCar from '@/components/pages/ShopCar'
import Home from '@/components/pages/Home'
import GoodsDetail from '@/components/pages/goodsDetail'
import VuesetStudy from '@/components/pages/VuesetStudy'
import List from '@/components/pages/List'
import Test from '@/components/pages/Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Tab',
      component: resolve => require(['@/components/pages/Tab'], resolve),
      children: [
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
    //商品列表
    {
      path: '/List',
      name: 'List',
      component: resolve => require(['@/components/pages/List'], resolve),
    },
    //学习vueset的用法
    {
      path: '/VuesetStudy',
      name: 'VuesetStudy',
      component: resolve => require(['@/components/pages/VuesetStudy'], resolve),
    },
    //测试页面
    {
      path: '/Test',
      name: 'Test',
      component: resolve => require(['@/components/pages/Test'], resolve),
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      // if (!from.meta.keepAlive) {
      //   from.meta.edPosition = document.documentElement.scrollTop;
      // }
      return { x: 0, y: 0 }
    }
  }
})
