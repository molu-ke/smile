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
import storeVueX from '@/store/store';

Vue.use(Router)

let router = new Router({
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
          meta: {
            require: true,  // 该路由需要登录
          },
        },
        {
          path: '/Store',
          name: 'Store',
          component: resolve => require(['@/components/pages/Store'], resolve),
          meta: {
            require: true,  // 该路由需要登录
          }
        },
        //分类
        {
          path: '/Classification',
          name: 'Classification',
          component: resolve => require(['@/components/pages/Classification'], resolve),
          meta: {
            require: true,  // 该路由需要登录
          }
        },
        //我的
        {
          path: '/Home',
          name: 'Home',
          component: resolve => require(['@/components/pages/Home'], resolve),
          meta: {
            require: true,  // 该路由需要登录
          }
        }
      ]
    },
    //购物车
    {
      path: '/ShopCar',
      name: 'ShopCar',
      component: resolve => require(['@/components/pages/ShopCar'], resolve),
      meta: {
        require: true,  // 该路由需要登录
      }
    },
    //商品详情页
    {
      path: '/GoodsDetail',
      name: 'GoodsDetail',
      component: resolve => require(['@/components/pages/goodsDetail'], resolve),
      meta: {
        require: false,  // 该路由不需要登录
      }
    },
    //商品列表
    {
      path: '/List',
      name: 'List',
      component: resolve => require(['@/components/pages/List'], resolve),
      meta: {
        require: true,  // 该路由需要登录
      }
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
// 路由拦截函数 -- vue-router中叫导航守卫（全局守卫）
router.beforeEach((to, from, next) => {
  if (to.meta.require) {
    if (!storeVueX.state.token) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 将跳转首页时的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  next()
})


export default router;
