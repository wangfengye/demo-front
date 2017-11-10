import Vue from 'vue'
import Vuex from 'vuex'
import permission from './modules/permission'
import Cookies from 'js-cookie'
import {login} from '@/api/user.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    permission
  },
  state: {
    login: false,
    account: null
  },
  getters: {
    mainRouters: state => state.permission.mainRouters,
    addRouters: state => state.permission.addRouters,
    permissionFinished: state => state.permission.isFinished,
    login: state => state.login,
    account: state => state.account
  },
  mutations: {
    login (state, roles, account) {
      console.log(account)
      let roleArray = new Array(0)
      for (let i = 0; i < roles.length; i++) {
        roleArray.push(roles[i].role)
      }
      Cookies.set('Token', roleArray, 10)
      state.login = true
    },
    setAccount (state, account) {
      state.account = account
    }
  },
  actions: {
    login ({commit}, data) {
      return new Promise((resolve, reject) => {
        login(data.account, data.password).then(resp => {
          let res = resp.data
          console.log(res)
          if (res.status === 200) {
            commit('login', res.data)
            resolve(true)
          } else {
            resolve(false)
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
})

export default store
