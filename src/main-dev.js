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
import MavonEditor from 'mavon-editor'
// 引入 MarkDown 编辑器 样式
import 'mavon-editor/dist/css/index.css'
// 引入vue-awesome-swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
// 引入swiper样式
import 'swiper/dist/css/swiper.min.css'
// import 'swiper/swiper-bundle.css'
// 引入顶部进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import VueLazyload from 'vue-lazyload'

// 引入防xss攻击库
import xss from 'xss'
// 给xss添加白名单,使文章详情与作者编辑的尽量一致
// xss.whiteList.input = ['type', 'src', 'disabled', 'checked', 'class']
xss.whiteList.img = ['src', 'alt', 'title', 'style', 'data-src']
xss.whiteList.hr = ['style', 'class']
xss.whiteList.br = ['style', 'class']
xss.whiteList.span = ['class', 'style']
xss.whiteList.i = ['class', 'style']
xss.whiteList.b = ['class', 'style']
xss.whiteList.strong = ['class', 'style']
// xss.whiteList.pre = ['class', 'style']
// xss.whiteList.code = ['style', 'class']
xss.whiteList.ul = ['style', 'class']
xss.whiteList.li = ['style', 'class']
xss.whiteList.ol = ['style', 'class']
xss.whiteList.dl = ['style', 'class']
xss.whiteList.dt = ['style', 'class']
xss.whiteList.p = ['style', 'class']
xss.whiteList.div = ['style', 'class']
xss.whiteList.table = ['style', 'class']
xss.whiteList.tbody = ['style', 'class']
xss.whiteList.tr = ['style', 'class']
xss.whiteList.td = ['style', 'class']
xss.whiteList.th = ['style', 'class']
xss.whiteList.em = ['style', 'class']
xss.whiteList.a = ['style', 'class', 'id', 'target', 'href', 'title']
xss.stripIgnoreTag = true
Vue.prototype.$xss = xss

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
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require('./assets/images/imgLoading.svg'), // 加载中图片，一定要有，不然会一直重复加载占位图
  error: require('./assets/images/imgErr.jpg') // 加载失败图片
})
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
