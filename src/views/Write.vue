<template>
  <div id="write">
    <Header-View></Header-View>
    <Write-form>
      <Editor></Editor>
    </Write-form>
  </div>
</template>

<script>
import HeaderView from '../components/Header'
import Editor from '../components/Editor'
import WriteForm from '../components/writeForm'
export default {
  name: 'Write',
  data () {
    return {
      thumb: ''
    }
  },
  components: {
    'Header-View': HeaderView,
    Editor,
    'Write-form': WriteForm
  }
}
</script>>
<style lang="less" scoped>
</style>
