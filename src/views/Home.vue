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
    <Home-Main>
      <Article-List></Article-List>
    </Home-Main>
  </div>
</template>

<script>
import LonginView from '../components/Login'
import HeaderView from '../components/Header'
import TopNavView from '../components/topNav'
import Slider from '../components/Slider'
import HomeMain from '../components/HomeMain'
import ArticleList from '../components/ArticleList'

import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    'Longin-View': LonginView,
    'Header-View': HeaderView,
    'TopNav-View': TopNavView,
    Slider,
    'Home-Main': HomeMain,
    'Article-List': ArticleList
  },
  computed: {
    ...mapState(['loginBox'])
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
