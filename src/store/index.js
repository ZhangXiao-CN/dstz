import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    loginBox: false,
    regShow: false,
    userInfo: {},
    categoryNav: [],
    categories: [],
    articleList: [],
    currentCategory: '最新文章'
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
    },
    changeCategoryNav (state, data) {
      state.categoryNav = data
    },
    categoriesPush (state, data) {
      state.categories.push(data)
    },
    changeArticleList (state, data) {
      state.articleList = data
    },
    changecurrentCategory (state, data) {
      state.articleList = data
    }
  },
  actions: {
  },
  modules: {
  }
})
