<template>
  <div id="home">
    <Header-View>
      <TopNav-View></TopNav-View>
    </Header-View>
    <transition name="opacityMask">
      <div class="mask" v-if="loginBox"></div>
    </transition>
    <transition name="bounceLogin">
      <Longin-View v-if="loginBox"></Longin-View>
    </transition>
    <Slider></Slider>
    <Main-And-Sidebar>
      <Article-List v-if="headerIsOver"></Article-List>
    </Main-And-Sidebar>
  </div>
</template>

<script>
import HeaderView from '../components/common/Header'
import LonginView from '../components/common/Login'
import MainAndSidebar from '../components/common/MainAndSidebar'
import TopNavView from '../components/common/TopNav'
import Slider from '../components/home/Slider'
import ArticleList from '../components/home/ArticleList'

import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    'Longin-View': LonginView,
    'Header-View': HeaderView,
    'TopNav-View': TopNavView,
    Slider,
    'Main-And-Sidebar': MainAndSidebar,
    'Article-List': ArticleList
  },
  computed: {
    ...mapState(['loginBox', 'headerIsOver'])
  }
}
</script>

<style lang="less" scoped>
.mask {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
}
</style>
