<template>
  <div id="user">
    <Header-View></Header-View>
    <transition name="opacityMask">
      <div class="mask" v-if="loginBox"></div>
    </transition>
    <transition name="bounceLogin">
      <Longin-View v-if="loginBox"></Longin-View>
    </transition>
    <!-- header组件created判断登陆状态后,再加载个人中心组件 -->
    <Persona-Center v-if="headerIsOver"></Persona-Center>
  </div>
</template>

<script>
import HeaderView from '../components/common/Header'
import LonginView from '../components/common/Login'
import PersonaCenter from '../components/PersonaCenter/PersonaCenter'
import { mapState } from 'vuex'
export default {
  name: 'User',
  data () {
    return {
      PersonaCenterFlag: true
    }
  },
  components: {
    'Longin-View': LonginView,
    'Header-View': HeaderView,
    'Persona-Center': PersonaCenter
  },
  computed: {
    ...mapState(['loginBox', 'headerIsOver'])
  },
  watch: {
    $route (to, from) {
      if (to.params.id !== from.params.id) {
        this.$router.go(0)
      }
    }
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
