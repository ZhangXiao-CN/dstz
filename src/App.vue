<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from './components/Footer'
export default {
  name: 'app',
  provide () {
    return {
      reload: this.reload,
      sideScroll: this.sideScroll
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  components: {
    Footer
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    },
    sideScroll () {
      if (document.documentElement.clientWidth < 760) {
        return
      }
      const sideBar = document.getElementById('sideBar') // 子盒子
      if (!sideBar) {
        return
      }
      const homeMain = document.getElementById('homeMain') // 父盒子
      const homeMainHeigth = homeMain.offsetHeight // 父盒子高度
      const sidBarHeigth = sideBar.offsetHeight // 子盒子的高度
      if (homeMainHeigth < sidBarHeigth) {
        homeMain.style.height = sidBarHeigth + 'px'
      }
      const homeMainOffsetTop = homeMain.offsetTop // 盒子距顶部
      const scrollTop = document.body.scrollTop + document.documentElement.scrollTop // 卷去高度
      const clientHeight = document.documentElement.clientHeight // 可视区高度
      // 距离顶部的高度 + 自身的高度 - 可视区的高度 = 需要被卷去的距离
      const moveY = homeMainOffsetTop + sidBarHeigth - clientHeight // 需要被卷去的距离
      const footer = document.getElementById('footer')
      const footerClientHeight = footer.offsetTop - scrollTop // footer距顶部
      if (scrollTop > moveY) {
        // console.log(sideBar.style.top)
        // footer 距窗口高度大于可视区时,移动盒子
        if (footerClientHeight > clientHeight) {
          sideBar.style.top = scrollTop - moveY + 'px' // 记得加单位
        } else {
          // 否则定位到最底部
          if (homeMainHeigth > sidBarHeigth) {
            sideBar.style.top = homeMain.offsetHeight - sidBarHeigth + 'px' // 记得加单位
          }
        }
      } else {
        sideBar.style.top = 0
      }
      // console.log(footerClientHeight)
    }
  },
  created () {
    this.$nextTick(this.sideScroll())
    window.addEventListener('scroll', this.sideScroll)
  }
}
</script>

<style lang="less" scoped>
#app {
  // height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: font-regular, 'Helvetica Neue', sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #304455;
  background-color: #edf0f2;
  // position: relative;
}
</style>
