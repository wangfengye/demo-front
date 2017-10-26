// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router, { asyncRouterMap } from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Cookies from 'js-cookie'
import Nanobar from 'Nanobar'
import store from './store/index'

Vue.config.productionTip = false

Vue.use(ElementUI)
/* eslint-disable no-new */
let getInfo = false

function hasPermission (role, route) {
  if (route.meta && route.meta.role) {
    console.log(route.meta.role + '---' + role)
    console.log(role === route.meta.role)
    return role === route.meta.role
  } else {
    return true
  }
}
function filterRouter (router, role) {
  console.log(router)
  let accessedRouters = router.filter(route => {
    if (hasPermission(role, route)) {
      if (route.children && route.children.length > 0) {
        console.log('child')
        route.children = filterRouter(route.children, role)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

router.beforeEach((to, from, next) => {
  var nanobar = new Nanobar()
  nanobar.go(100)
  nanobar = null
  if (to.path === '/login') {
    next()
  } else {
    if (Cookies.get('login_role')) {
      if ((!this.getInfo)) {
        this.getInfo = true
        router.addRoutes(filterRouter(asyncRouterMap, 'normal'))
        // router.addRoutes(asyncRouterMap)
        next(to.path)
      } else {
        next()
      }
    } else {
      next('/login')
    }
  }
})
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
