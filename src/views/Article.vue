<template>
  <div id="article">
    <Header-View></Header-View>
    <transition name="opacityMask">
      <div class="mask" v-if="loginBox"></div>
    </transition>
    <transition name="bounceLogin">
      <Longin-View v-if="loginBox"></Longin-View>
    </transition>
    <Home-Main>
      <Article-Details></Article-Details>
    </Home-Main>
  </div>
</template>

<script>
import HeaderView from '../components/Header'
import LonginView from '../components/Login'
import HomeMain from '../components/HomeMain'
import ArticleDetails from '../components/ArticleDetails'
import { mapState } from 'vuex'
export default {
  name: 'Article',
  components: {
    'Header-View': HeaderView,
    'Longin-View': LonginView,
    'Home-Main': HomeMain,
    'Article-Details': ArticleDetails
  },
  computed: {
    ...mapState(['loginBox'])
  }
}
</script>>
<style lang="less" scoped>
.mask {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 2001;
}
</style>
