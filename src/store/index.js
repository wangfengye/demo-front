import Vue from 'vue'
import Vuex from 'vuex'
import permission from './modules/permission'
import Cookies from 'js-cookie'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    permission
  },
  state: {
    login: false
  },
  getters: {
    mainRouters: state => state.permission.mainRouters,
    addRouters: state => state.permission.addRouters,
    permissionFinished: state => state.permission.isFinished,
    login: state => state.login
  },
  mutations: {
    login (state, role) {
      Cookies.set('Token', role, 10)
      state.login = true
    }
  },
  actions: {
    login ({commit}, data) {
      return new Promise(resolve => {
        commit('login', data.account)
        resolve()
      })
    }
  }
})

export default store
