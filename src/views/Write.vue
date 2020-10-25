<template>
  <div id="write">
    <Header-View></Header-View>
    <!-- header组件created判断登陆状态后,再加载文章编辑组件 -->
    <Write-form v-if="headerIsOver"></Write-form>
    <transition name="opacityMask">
      <div class="mask" v-if="loginBox"></div>
    </transition>
    <transition name="bounceLogin">
      <Longin-View v-if="loginBox"></Longin-View>
    </transition>
  </div>
</template>

<script>
import HeaderView from '../components/common/Header'
import WriteForm from '../components/write/writeForm'
import LonginView from '../components/common/Login'
import { mapState } from 'vuex'
export default {
  name: 'Write',
  components: {
    'Header-View': HeaderView,
    'Write-form': WriteForm,
    'Longin-View': LonginView
  },
  computed: {
    ...mapState(['loginBox', 'headerIsOver'])
  }
}
</script>>
<style lang="less" scoped>
#write {
  height: 100%;
}
</style>
