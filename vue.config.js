module.exports = {
  chainWebpack: config => {
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-prod.js')

      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        nprogress: 'NProgress',
        'mavon-editor': 'MavonEditor',
        'vue-awesome-swiper': 'VueAwesomeSwiper',
        vuex: 'Vuex'
      })

      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })

    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')

      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
  },

  assetsDir: './',
  productionSourceMap: false
}
