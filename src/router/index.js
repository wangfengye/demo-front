import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login'
import AppMain from '../pages/AppMain'
import Permission from '../pages/Permission'
import Test from '../pages/test'
/* lazy loading routes */
const error404 = r => require.ensure([], () => r(require('../pages/errorpages/404')), 'error404')

const sketch = r => require.ensure([], () => r(require('../pages/introduce/sketch')), 'sketch')
const appMian = r => require.ensure([], () => r(require('../pages/app/index')), 'appMain')
const appAdd = r => require.ensure([], () => r(require('../pages/app/add')), 'appAdd')
const appHistory = r => require.ensure([], () => r(require('../pages/app/history')), 'appHistory')
const quote = r => require.ensure([], () => r(require('../pages/quote')), 'quote')
Vue.use(Router)
/**
 * 首页和登录页和一些不用权限的公用页面
 */
export const SimpleRouterMap = [
  {
    path: '/login',
    name: '登录',
    component: Login
  }, {
    path: '/404',
    component: error404,
    name: '错误页面',
    icon: '404'
  }, {
    path: '/test',
    name: '测试组件',
    component: Test
  }
]
export default new Router({
  // mode: 'history',
  routes: SimpleRouterMap
})

export const asyncRouterMap = [
  {
    path: '/',
    component: AppMain,
    redirect: 'sketch',
    children: [{
      path: 'sketch',
      name: '简述',
      meta: { role: 'admin' },
      component: sketch
    }, {
      path: '/quote',
      name: '个性评论',
      component: quote
    }]
  }, {
    path: '/app',
    name: 'APP管理',
    component: AppMain,
    children: [{
      path: 'main',
      name: '软件列表',
      component: appMian,
      children: [{ path: 'history', name: '版本历史', component: appHistory }]
    }, {
      path: 'add',
      name: '添加应用',
      meta: { role: 'admin' },
      component: appAdd
    }]
  }
]
