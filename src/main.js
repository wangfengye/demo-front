// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router, { asyncRouterMap } from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './assets/icon/iconfont.css'
import Cookies from 'js-cookie'
import Nanobar from 'Nanobar'
import store from './store/index'

Vue.config.productionTip = false

Vue.use(ElementUI)
/* eslint-disable no-new */
const nanobar = new Nanobar()
router.beforeEach((to, from, next) => {
  console.log(Cookies.get('Token'))
  nanobar.go(0)
  if (Cookies.get('Token')) {
    if (!store.getters.permissionFinished) {
      store.dispatch('GenerateRoutes', Cookies.get('Token')).then(() => {
        router.addRoutes(store.getters.mainRouters)
        next(to.path)
      })
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
router.afterEach((to, from, next) => {
  nanobar.go(100)
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
