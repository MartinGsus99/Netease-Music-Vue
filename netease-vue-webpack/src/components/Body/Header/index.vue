<template>
  <div>
    <el-row>
      <el-col :span="16">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          :ellipsis="false"
          @select="handleSelect"
        >
          <el-menu-item index="0">
            <img class="logo" src="@/assets/img/logo.png" />
          </el-menu-item>
          <el-menu-item index="home">Netease Music</el-menu-item>
          <el-menu-item index="find">发现音乐</el-menu-item>
          <el-menu-item index="recommand">推荐歌单</el-menu-item>
          <el-menu-item index="latest">最新音乐</el-menu-item>
          <el-menu-item index="latestMV">最新 mv</el-menu-item>
        </el-menu>
      </el-col>

      <el-col :span="4">
        <div class="search-container">
          <el-autocomplete
            v-model="keywords"
            :fetch-suggestions="querySearchAsync"
            placeholder="搜索"
            :style="{ width: '100%' }"
          />
        </div>
      </el-col>

      <el-col :span="4">
        <div class="person-infor-container">
          <el-dropdown>
            <span class="el-dropdown-link">
              <div class="nickname-wrapper">
                {{ this.username }}
                <img :src="this.imgurl" class="img-wrapper" />
              </div>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Header",
  data () {
    return {
      activeIndex: "1",
      activeName: '',
      username: "",
      imgurl: "",
      search: "",
      keywords: '',
    }
  },
  mounted () {
    this.getUserInfor(418165896)
  },
  methods: {
    handleSelect (key, keyPath) {
      if (key == 'home') {
        this.$router.push('/home/index')
      }
    },
    getUserInfor (uid) {
      this.axios.get('http://127.0.0.1:3000/user/detail?uid=' + uid)
        .then((res) => {
          if (res.data.code == 200) {
            // console.log(res.data.profile)
            let profile = res.data.profile
            this.username = profile.nickname
            this.imgurl = profile.avatarUrl
          }
        })
    },
    querySearchAsync (keywords, cb) {

    },
    logout () {
      console.log('logout')
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

.search-container {
  margin-top: 13px;
}

.person-infor-container {
  margin-top: 13px;
}

.nickname-wrapper {
  font-size: 20px;
  margin-right: 10px;
}

.img-wrapper {
  width: 40px;
  height: 40px;
}

img {
  width: 30px;
  height: 30px;
}
</style>
