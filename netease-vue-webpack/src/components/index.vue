<template lang="">
<div class='container'>
  <Header></Header>
  <router-view>
    <Sheets></Sheets>
  </router-view>
  <div class='footer-wrapper'>
    <Footer></Footer>
  </div>
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
.container {
  width: 100%;
  height: 100%;
  overflow: hidden; /* 隐藏滚动条 */
}

.content {
  width: 100%;
  height: 100%;
  overflow-y: scroll; /* 允许垂直滚动 */
  scrollbar-width: none; /* 隐藏滚动条宽度（适用于Firefox） */
  -ms-overflow-style: none; /* 隐藏滚动条样式（适用于IE和Edge） */
}

/* 适用于Webkit浏览器（Chrome，Safari等） */
.content::-webkit-scrollbar {
  display: none; /* 隐藏滚动条 */
}

.footer-wrapper {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 150px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 999;
}
</style>
