<template>
  <div id="message">
    <Header-View></Header-View>
    <transition name="opacityMask">
      <div class="mask" v-if="loginBox"></div>
    </transition>
    <transition name="bounceLogin">
      <Longin-View v-if="loginBox"></Longin-View>
    </transition>
    <Notice-View v-if="headerIsOver"></Notice-View>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HeaderView from '../components/common/Header'
import LonginView from '../components/common/Login'
import NoticeView from '../components/message/Notice'
export default {
  name: 'Message',
  data () {
    return {}
  },
  components: {
    'Longin-View': LonginView,
    'Header-View': HeaderView,
    'Notice-View': NoticeView
  },
  computed: {
    ...mapState(['headerIsOver', 'loginBox'])
  }
}
</script>

<style lang="less" scoped>
</style>
