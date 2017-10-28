import Vue from 'vue'
import Vuex from 'vuex'
import permission from './modules/permission'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    permission
  },
  getters: {
    mainRouters: state => state.permission.mianRouters,
    addRouters: state => state.permission.addRouters
  }
})

export default store
