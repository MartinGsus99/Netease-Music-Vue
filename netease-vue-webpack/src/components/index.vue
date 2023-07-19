<template lang="">
<div>
  <Header></Header>
  <router-view>
    <Sheets></Sheets>
  </router-view>
  <Footer></Footer>
</div>
</template>

<script>
import Header from '@/components/Body/Header/index.vue'
import Footer from '@/components/Body/Footer/index.vue'
import Sheets from '@/components/Body/Sheets/index.vue'
export default {
  name: "Home",
  components: {
    Header,
    Footer,
    Sheets,
  },
}
</script>

<style lang="">
</style>
