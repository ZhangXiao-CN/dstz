<template>
  <div id="user">
    <Header-View></Header-View>
    <transition name="opacityMask">
      <div class="mask" v-if="loginBox"></div>
    </transition>
    <transition name="bounceLogin">
      <Longin-View v-if="loginBox"></Longin-View>
    </transition>
    <Persona-Center></Persona-Center>
  </div>
</template>

<script>
import LonginView from '../components/common/Login'
import HeaderView from '../components/common/Header'
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
    ...mapState(['loginBox'])
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
