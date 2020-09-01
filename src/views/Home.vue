<template>
  <div id="home">
    <Header-View></Header-View>
    <TopNav-View></TopNav-View>
    <transition name="opacity">
      <div class="mask" v-if="loginBox"></div>
    </transition>
    <transition name="bounce">
      <Longin-View v-if="loginBox"></Longin-View>
    </transition>
  </div>
</template>

<script>
import LonginView from '../components/Login'
import HeaderView from '../components/Header'
import TopNavView from '../components/topNav'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    'Longin-View': LonginView,
    'Header-View': HeaderView,
    'TopNav-View': TopNavView
  },
  computed: {
    ...mapState(['loginBox'])
  }

}
</script>>

<style lang="less" scoped>
#home {
  height: 100%;
}

.mask {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.opacity-enter-active {
  animation: opacity-in 0.5s;
}
.opacity-leave-active {
  animation: opacity-in 0.5s reverse;
}
@keyframes opacity-in {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
