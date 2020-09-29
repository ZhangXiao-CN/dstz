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
    currentCategoryTitle: '<i class="iconfont icon-zuixin"></i>最新文章',
    currentCategory: '',
    currentCategoryChilren: '',
    articleMroe: true,
    articleListLoading: false,
    articleSearch: '',
    articleLimit: 10,
    backShow: false,
    headerIsOver: false
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
    changeCurrentCategoryTitle (state, data) {
      state.currentCategoryTitle = data
    },
    changeHeaderIsOver (state, bool) {
      state.headerIsOver = bool
    },
    changeCurrentCategory (state, data) {
      state.currentCategory = data
    },
    changeCurrentCategoryChilren (state, data) {
      state.currentCategoryChilren = data
    },
    changeArticleMroe (state, bool) {
      state.articleMroe = bool
    },
    changeArticleListLoading (state, bool) {
      state.articleListLoading = bool
    },
    changeArticleSearch (state, data) {
      state.articleSearch = data
    },
    changeArticleLimit (state, data) {
      state.articleLimit = data
    },
    changeBackShow (state, bool) {
      state.backShow = bool
    }
  },
  actions: {
  },
  modules: {
  }
})
