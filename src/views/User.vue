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
import LonginView from '../components/Login'
import HeaderView from '../components/Header'
import PersonaCenter from '../components/PersonaCenter'
import { mapState } from 'vuex'
export default {
  name: 'User',
  components: {
    'Longin-View': LonginView,
    'Header-View': HeaderView,
    'Persona-Center': PersonaCenter
  },
  computed: {
    ...mapState(['loginBox'])
  }
}
</script>

<style lang="less" scoped>
</style>
