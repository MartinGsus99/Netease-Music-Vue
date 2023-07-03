<template lang="">
  <div>
      <MusicList></MusicList>
  </div>
</template>
<script>
import { getUserFollows } from '../../api/user'
import MusicList from './musicList.vue'
import axios from 'axios'
export default {
  name: "Body",
  components: {
    MusicList
  },
  methods: {
    getUserFollowsList () {
      axios
        .get('http://127.0.0.1:3000/user/follows?uid=32953014')
        .then(response => (this.info = response.data.sites))
        .catch(function (error) { // 请求失败处理
          console.log(error)
        })
    }
  },
  mounted () {
    this.getUserFollowsList()
  }
}
</script>
<style lang="css">
</style>