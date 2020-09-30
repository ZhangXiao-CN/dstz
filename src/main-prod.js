import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import './plugins/element.js'
import './assets/css/global.less'
import './assets/font/iconfont.css'
// 引入 MarkDown 编辑器
import MavonEditor from 'mavon-editor'
// 引入 MarkDown 编辑器 样式
// import 'mavon-editor/dist/css/index.css'
// 引入vue-awesome-swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
// 引入swiper样式
// import 'swiper/css/swiper.css'
// import 'swiper/swiper-bundle.css'
// 引入顶部进度条
import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

Vue.config.productionTip = false
// 定义axios默认地址
axios.defaults.baseURL = 'http://localhost:3000/'
// 设置带上Cookie 需配合后端设置
axios.defaults.withCredentials = true
axios.interceptors.request.use(function (req) {
  NProgress.start()
  return req
})
// 利用拦截器捕获axios错误或异常
axios.interceptors.response.use(function (res) {
  NProgress.done()
  return res
}, function (err) {
  NProgress.done()
  return Promise.reject(err.response.data)
})

Vue.use(VueAxios, axios)
Vue.use(MavonEditor)
Vue.use(VueAwesomeSwiper)

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

Vue.filter('filterDate', (str) => {
  const minute = 1000 * 60
  const hour = minute * 60
  const day = hour * 24
  const month = day * 30
  const timestamp = new Date(str).getTime()
  const now = new Date().getTime()
  const diffValue = now - timestamp
  if (diffValue < 0) {
    return '不久前'
  }
  // 计算差异时间的量级
  const monthC = diffValue / month
  const weekC = diffValue / (7 * day)
  const dayC = diffValue / day
  const hourC = diffValue / hour
  const minC = diffValue / minute
  // 数值补0方法
  const zero = function (value) {
    if (value < 10) {
      return '0' + value
    }
    return value
  }
  // 使用
  if (monthC > 4) {
    // 超过1年，直接显示年月日
    return (function () {
      const date = new Date(timestamp)
      return date.getFullYear() + '年' + zero(date.getMonth() + 1) + '月' + zero(date.getDate()) + '日'
    })()
  } else if (monthC >= 1) {
    return parseInt(monthC) + '月前'
  } else if (weekC >= 1) {
    return parseInt(weekC) + '周前'
  } else if (dayC >= 1) {
    return parseInt(dayC) + '天前'
  } else if (hourC >= 1) {
    return parseInt(hourC) + '小时前'
  } else if (minC >= 1) {
    return parseInt(minC) + '分钟前'
  }
  return '刚刚'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
