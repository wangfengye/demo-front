import Vue from 'vue'
import Router from 'vue-router'

/* lazy loading routes */
// 定义异步加载vue的方法
const asyncLoad = {
  load (url) {
    return r => require.ensure([], () => r(require('@/pages/' + url + '.vue')))
  }
}

Vue.use(Router)
/**
 * 首页和登录页和一些不用权限的公用页面
 */
export const simpleRouterMap = [
  {
    path: '/login',
    name: '登录',
    component: asyncLoad.load('Login')
  }, {
    path: '/404',
    component: asyncLoad.load('errorpages/404'),
    name: '错误页面',
    icon: '404'
  }, {
    path: '/test',
    name: '测试组件',
    component: asyncLoad.load('test')
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
    component: asyncLoad.load('AppMain'),
    redirect: '/sketch',
    children: [
      {
        path: '/sketch',
        icon: 'el-icon-document',
        name: '简述',
        menu: false,
        component: asyncLoad.load('introduce/sketch')
      }, {
        path: '/quote',
        icon: 'el-icon-edit',
        name: '个性评论',
        menu: false,
        component: asyncLoad.load('quote')
      }, {
        path: '/app',
        icon: 'el-icon-demo-android',
        name: 'APP管理',
        meta: { role: 'admin/normal' },
        menu: true,
        component: asyncLoad.load('app/index'),
        children: [{
          path: 'main',
          name: '软件列表',
          meta: { role: 'admin/normal' },
          component: asyncLoad.load('app/cards'),
          children: [{ path: 'history', name: '版本历史', component: asyncLoad.load('app/history') }]
        }, {
          path: 'add',
          name: '添加应用',
          meta: { role: 'admin' },
          component: asyncLoad.load('app/add')
        }]
      }, {
        path: '/set',
        icon: 'el-icon-setting',
        name: '系统管理',
        meta: {role: 'admin'},
        menu: true,
        component: asyncLoad.load('set/index'),
        children: [{
          path: 'permission',
          name: '权限管理',
          component: asyncLoad.load('set/permission')
        }]
      }
    ]
  }
]
