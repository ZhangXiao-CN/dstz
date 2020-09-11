import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './plugins/element.js'
import './assets/css/global.less'
import './assets/font/iconfont.css'
// 引入 MarkDown 编辑器
import mavonEditor from 'mavon-editor'
// 引入 MarkDown 编辑器 样式
import 'mavon-editor/dist/css/index.css'
// 引入vue-awesome-swiper
import vueSwiper from 'vue-awesome-swiper'
// 引入swiper样式
import 'swiper/css/swiper.css'
// import 'swiper/swiper-bundle.css'
Vue.config.productionTip = false
// 定义axios默认地址
axios.defaults.baseURL = 'http://localhost:3000/'
// 设置带上Cookie 需配合后端设置
axios.defaults.withCredentials = true
// 利用拦截器捕获axios错误或异常
axios.interceptors.response.use(function (res) {
  return res
}, function (err) {
  return Promise.reject(err.response.data)
})

Vue.use(VueAxios, axios)
Vue.use(mavonEditor)
Vue.use(vueSwiper)

Vue.filter('filterCategory', (article) => {
  let category = ''
  if (!article) {
    category = ''
  }
  if (!article.categoryChilren) {
    category = article.category && article.category.title
  } else {
    article.category.children.forEach((item) => {
      if (article.categoryChilren === item._id) {
        category = item.childrenTitle && item.childrenTitle
      }
    })
  }
  return category
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
