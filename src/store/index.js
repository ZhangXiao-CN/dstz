import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    loginBox: false,
    regShow: false,
    userInfo: {}
  },
  mutations: {
    changeIsLogin (state, bool) {
      state.isLogin = bool
    },
    changeLoginBox (state, bool) {
      state.loginBox = bool
    },
    changeRegShow (state, bool) {
      state.regShow = bool
    },
    changeuserInfo (state, data) {
      state.userInfo = data
    }
  },
  actions: {
  },
  modules: {
  }
})
