<template>
  <div id="article">
    <Header-View></Header-View>
    <transition name="opacityMask">
      <div class="mask" v-if="loginBox"></div>
    </transition>
    <transition name="bounceLogin">
      <Longin-View v-if="loginBox"></Longin-View>
    </transition>
    <Main-And-Sidebar>
      <Article-Details></Article-Details>
    </Main-And-Sidebar>
  </div>
</template>

<script>
import HeaderView from '../components/common/Header'
import LonginView from '../components/common/Login'
import MainAndSidebar from '../components/common/MainAndSidebar'
import ArticleDetails from '../components/ArticleDetails/ArticleDetails'
import { mapState } from 'vuex'
export default {
  name: 'Article',
  components: {
    'Header-View': HeaderView,
    'Longin-View': LonginView,
    'Main-And-Sidebar': MainAndSidebar,
    'Article-Details': ArticleDetails
  },
  computed: {
    ...mapState(['loginBox'])
  }
}
</script>>
<style lang="less" scoped>
</style>
