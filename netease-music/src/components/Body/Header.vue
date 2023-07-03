<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="0">
      <img class="logo" src="../../assets/img/logo.png" />
    </el-menu-item>
    <el-menu-item index="1">Netease Music</el-menu-item>
    <el-menu-item index="2">发现音乐</el-menu-item>
    <el-menu-item index="3">推荐歌单</el-menu-item>
    <el-menu-item index="4">最新音乐</el-menu-item>
    <el-menu-item index="5">最新 mv</el-menu-item>
    <div class="flex-grow" />

    <el-menu-item>
      <div class="input-container">
        <el-input
          v-model="search"
          placeholder="搜索"
          prefix-icon="el-icon-search"
          size="small"
        ></el-input>
      </div>
    </el-menu-item>
    <el-sub-menu index="6">
      <template #title>欢迎，{{ username }}</template>
      <el-menu-item index="personal center">个人中心</el-menu-item>
      <el-menu-item index="setting">设置</el-menu-item>
      <el-menu-item index="logout">退出登录</el-menu-item>
      <!-- <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu> -->
    </el-sub-menu>
  </el-menu>
</template>

<script>
export default {
  name: "Header",
  data () {
    return {
      activeIndex: "1",
      username: "Miracle",
      search: "",
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
  },
};
</script>
<style lang="css">
.flex-grow {
  flex-grow: 1;
}

.logo {
  width: 50px;
  height: 50px;
  margin-top: 10px;
}

.input-container {
  height: 100%;
  width: 100%;
  margin-bottom: 30px;
}
</style>