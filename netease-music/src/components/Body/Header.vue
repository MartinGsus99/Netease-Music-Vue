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
        <el-autocomplete
          v-model="keywords"
          :fetch-suggestions="querySearchAsync"
          placeholder="Please input"
          @select="handleSelect"
        />
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
import axios from 'axios'
export default {
  name: "Header",
  data () {
    return {
      activeIndex: "1",
      username: "Miracle",
      search: "",
      keywords: '',
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    querySearchAsync (keywords, cb) {
      axios.get('http://127.0.0.1:3000/search/suggest?keywords=' + keywords)
        .then((res) => {
          if (res.data.code == 200) {
            console.log(res.data.result)
            let result = res.data.result
            if (result.hasOwnProperty('songs')) {
              const results = result.songs
              console.log(results)
              setTimeout(() => {
                let data = results.map((item) => {
                  return {
                    value: item.name + '-' + item.artists[0].name,
                    label: item.id,
                  }
                })
                cb(data)
              }, 1000)
            }
          }
        })
    },
    handleSelect (item) {
      //播放音乐
      console.log(item)
    }
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