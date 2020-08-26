<template>
  <div id="app">
    <div>index</div>
    <Login></Login>
  </div>
</template>

<script>
import Login from './components/Login.vue'
export default {
  name: 'app',
  components: {
    Login
  }
}
</script>

<style lang="less" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #eff2f4;
  position: relative;
}
</style>
