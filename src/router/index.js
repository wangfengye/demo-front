import Vue from 'vue'
import Router from 'vue-router'

/* lazy loading routes */
// 定义异步加载vue的方法
const login = r => require.ensure([], () => r(require('@/pages/login')), 'login')
const e404 = r => require.ensure([], () => r(require('@/pages/errorpages/404')), 'e404')
const test = r => require.ensure([], () => r(require('@/pages/test')), 'test')
const appMain = r => require.ensure([], () => r(require('@/pages/AppMain')), 'appMain')
const sketch = r => require.ensure([], () => r(require('@/pages/introduce/sketch')), 'sketch')
const quote = r => require.ensure([], () => r(require('@/pages/quote')), 'quote')
const apk = r => require.ensure([], () => r(require('@/pages/app/index')), 'apk')
const history = r => require.ensure([], () => r(require('@/pages/app/history')), 'history')
const cards = r => require.ensure([], () => r(require('@/pages/app/cards')), 'cards')
const add = r => require.ensure([], () => r(require('@/pages/app/add')), 'add')
const apply = r => require.ensure([], () => r(require('@/pages/app/apply')), 'apply')
const applyHistory = r => require.ensure([], () => r(require('@/pages/app/applyHistory')), 'applyHistory')
const set = r => require.ensure([], () => r(require('@/pages/set/index')), 'set')
const permission = r => require.ensure([], () => r(require('@/pages/set/permission')), 'permission')
const role = r => require.ensure([], () => r(require('@/pages/set/role')), 'role')
const user = r => require.ensure([], () => r(require('@/pages/set/user')), 'user')
const recreation = r => require.ensure([], () => r(require('@/pages/recreation/index')), 'recreation')
const girls = r => require.ensure([], () => r(require('@/pages/recreation/girls')), 'girls')
const firework = r => require.ensure([], () => r(require('@/pages/recreation/firework.vue')), 'firework')

Vue.use(Router)
/**
 * 首页和登录页和一些不用权限的公用页面
 */
export const simpleRouterMap = [
  {
    path: '/login',
    name: '登录',
    component: login
  }, {
    path: '/404',
    component: e404,
    name: '错误页面',
    icon: '404'
  }, {
    path: '/test',
    name: '测试组件',
    component: test
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
    component: appMain,
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
        meta: {role: ['recreation']},
        menu: false,
        component: quote
      }, {
        path: '/apk',
        icon: 'el-icon-demo-android',
        name: 'APP管理',
        meta: {role: ['admin', 'ascend']},
        menu: true,
        component: apk,
        children: [{
          path: 'main',
          name: '软件列表',
          meta: {role: ['admin', 'ascend']},
          component: cards,
          children: [{ path: 'history', name: '版本历史', component: history }]
        }, {
          path: 'add',
          name: '添加应用',
          meta: {role: ['admin']},
          component: add
        }, {
          path: 'apply',
          name: '账号申请',
          meta: {role: ['ascend']},
          component: apply
        }, {
          path: 'applyHistory',
          name: '申请记录',
          meta: {role: ['admin']},
          component: applyHistory
        }]
      }, {
        path: '/set',
        icon: 'el-icon-setting',
        name: '系统管理',
        meta: {role: ['admin']},
        menu: true,
        component: set,
        children: [{
          path: 'permission',
          name: '权限管理',
          meta: {role: ['admin']},
          component: permission
        }, {
          path: 'role',
          name: '角色管理',
          meta: {role: ['admin']},
          component: role
        }, {
          path: 'user',
          name: '用户管理',
          meta: {role: ['admin']},
          component: user
        }]
      }, {
        path: '/recreation',
        name: '娱乐',
        icon: 'el-icon-star-on',
        meta: {role: ['recreation']},
        menu: true,
        component: recreation,
        children: [
          {
            path: 'girls',
            name: '每日美图',
            component: girls
          },
          {
            path: 'firework',
            name: '烟花',
            component: firework
          }
        ]
      }

    ]
  }
]
