import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false, // 登陆状态
    loginBox: false, // 登陆模块显示
    regShow: false, // 注册模块显示
    userInfo: {}, // 登陆用户
    categoryNav: [], // 分类导航
    categories: [], // 分类列表
    articleList: [], // 最新文章列表
    currentCategoryTitle: '<i class="iconfont icon-zuixin"></i>最新文章', // 主页文章列表标题
    currentCategory: '', // 当前一级分类
    currentCategoryChilren: '', // 当前二级分类
    articleMroe: true, // 加载更多显示
    articleListLoading: true, // 文章加载loading
    articleSearch: '', // 文章搜索
    articleLimit: 10, // 文章请求数量
    backShow: false, // 返回模块显示
    isSearch: false, // 是否是搜索状态
    headerIsOver: false, // header模块是否加载完毕
    defaultAvatar: 'http://localhost:3000/assets/img/defaultAvatar.png'
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
    },
    changeIsSearch (state, bool) {
      state.isSearch = bool
    }
  },
  actions: {
  },
  modules: {
  }
})
