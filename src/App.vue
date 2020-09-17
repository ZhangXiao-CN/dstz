<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from './components/common/Footer'
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
      if (document.documentElement.clientWidth < 768) {
        return
      }
      const sideBar = document.getElementById('sideBar') // 子盒子
      if (!sideBar) {
        return
      }
      const mainAndSidebar = document.getElementById('mainAndSidebar') // 父盒子
      const mainAndSidebarHeigth = mainAndSidebar.offsetHeight // 父盒子高度
      const sidBarHeigth = sideBar.offsetHeight // 子盒子的高度
      if (mainAndSidebarHeigth < sidBarHeigth) {
        mainAndSidebar.style.height = sidBarHeigth + 'px'
      }
      const mainAndSidebarOffsetTop = mainAndSidebar.offsetTop // 盒子距顶部
      const scrollTop = document.body.scrollTop + document.documentElement.scrollTop // 卷去高度
      const clientHeight = document.documentElement.clientHeight // 可视区高度
      // 距离顶部的高度 + 自身的高度 - 可视区的高度 = 需要被卷去的距离
      const moveY = mainAndSidebarOffsetTop + sidBarHeigth - clientHeight // 需要被卷去的距离
      const footer = document.getElementById('footer')
      const footerClientHeight = footer.offsetTop - scrollTop // footer距顶部
      if (scrollTop > moveY) {
        // console.log(sideBar.style.top)
        // footer 距窗口高度大于可视区时,移动盒子
        if (footerClientHeight > clientHeight) {
          sideBar.style.top = scrollTop - moveY + 'px' // 记得加单位
        } else {
          // 否则定位到最底部
          if (mainAndSidebarHeigth > sidBarHeigth) {
            sideBar.style.top = mainAndSidebar.offsetHeight - sidBarHeigth + 'px' // 记得加单位
          }
        }
      } else {
        sideBar.style.top = 0
      }
      // console.log(footerClientHeight)
    }
  },
  created () {
    this.sideScroll()
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
