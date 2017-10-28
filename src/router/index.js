import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login'
import AppMain from '../pages/AppMain'
import Test from '../pages/test'
/* lazy loading routes */
const error404 = r => require.ensure([], () => r(require('../pages/errorpages/404')), 'error404')

const sketch = r => require.ensure([], () => r(require('../pages/introduce/sketch')), 'sketch')
const app = r => require.ensure([], () => r(require('../pages/app/index')), 'index')
const cards = r => require.ensure([], () => r(require('../pages/app/cards')), 'cards')
const appAdd = r => require.ensure([], () => r(require('../pages/app/add')), 'appAdd')
const appHistory = r => require.ensure([], () => r(require('../pages/app/history')), 'appHistory')
const quote = r => require.ensure([], () => r(require('../pages/quote')), 'quote')
Vue.use(Router)
/**
 * 首页和登录页和一些不用权限的公用页面
 */
export const simpleRouterMap = [
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
  routes: simpleRouterMap
})

export const asyncRouterMap = [
  {
    path: '/',
    name: '主页',
    component: AppMain,
    redirect: '/sketch',
    children: [
      {
        path: '/sketch',
        icon: 'el-icon-document',
        name: '简述',
        menu: false,
        component: sketch
      }, {
        path: '/quote',
        icon: 'el-icon-edit',
        name: '个性评论',
        menu: false,
        component: quote
      }, {
        path: '/app',
        icon: 'el-icon-demo-android',
        name: 'APP管理',
        meta: { role: 'admin/normal' },
        menu: true,
        component: app,
        children: [{
          path: 'main',
          name: '软件列表',
          meta: { role: 'admin/normal' },
          component: cards,
          children: [{ path: 'history', name: '版本历史', component: appHistory }]
        }, {
          path: 'add',
          name: '添加应用',
          meta: { role: 'admin' },
          component: appAdd
        }]
      }
    ]
  }
]
