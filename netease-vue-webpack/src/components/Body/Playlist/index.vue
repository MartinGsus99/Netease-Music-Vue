<template>
  <div>
    <div v-show="true">
      <el-table
        :data="playlist"
        height="900"
        style="width: 100%"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="name" label="歌名" width="180" />
        <el-table-column prop="album" label="专辑" width="180" />
        <el-table-column prop="artist" label="歌手" width="180" />
        <el-table-column prop="img" label="封面" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              @click="playMusic(scope.row.id, scope.row.name)"
              >播放</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { store } from '@/utils/store.js'

export default {
  name: 'Playlist',
  props: [
  ],
  mounted () {
    const playlistId = this.$route.params.id
    this.loadPlayList(playlistId)
  },
  data () {
    return {
      playlist: [],
    }
  },
  methods: {
    loadPlayList (sheetId) {
      this.axios
        .get('http://127.0.0.1:3000/playlist/track/all?id=' + sheetId)
        .then((response) => {
          this.playlist = []
          response.data.songs.map((item) => {
            let songInfor = {
              id: item.al.id,
              name: item.name,
              album: item.al.name,
              artist: item.ar[0].name,
              img: item.al.picUrl,
            }
            this.playlist.push(songInfor)
          })
        })
        .catch(function (error) { // 请求失败处理
          console.log(error)
        })
    },
    playMusic (id, name) {
      store.changeMusicId(id)
      store.changeMusicName(name)
      console.log('Musicname:', store.musicName)
      console.log('MusicId:', store.musicId)

    },



  }
}

</script>
<style lang="">
</style>