<template>
  <div id="write">
    <Header-View></Header-View>
    <Wang-Editor></Wang-Editor>
  </div>
</template>

<script>
import HeaderView from '../components/Header'
import WangEditor from '../components/WangEditor'
export default {
  name: 'Write',
  components: {
    'Header-View': HeaderView,
    'Wang-Editor': WangEditor
  }
}
</script>>

<style lang="less" scoped>
</style>
