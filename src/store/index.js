import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    aa: 'sss55555555555555555'
  },
  getters: {
    aa: state => state.aa
  },
  mutations: {
    aa (state, s) { state.aa = s }
  },
  actions: {
    aa ({commit}, s) {
      setTimeout(() => {
        commit('aa', s)
      }, 3000)
    }
  }
})

export default store
