import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/font/iconfont.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
