<template>
  <Home :msg="msg"></Home>
</template>

<script>
import Home from './views/Home.vue'
import { ElMessage } from 'element-plus'

export default {
  name: 'App',
  components: {
    Home
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
