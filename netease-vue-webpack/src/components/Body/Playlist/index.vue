<template>
  <div class="playlist-container">
    <el-table
      :scrollbar="scrollbarOptions"
      :data="playlist"
      height="100%"
      :max-height="tableHeight"
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
            @click="PlayMusic(scope.row.id, scope.row.name)"
            >播放</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>

import store from '@/utils/store.js'

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
      tableHeight: '800px', // 表格的高度
      scrollbarOptions: {
        disabled: true, // 禁用默认的滚动条
        width: '0px' // 隐藏滚动条宽度
      }
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
    PlayMusic (id, song_name) {
      console.log("Playing:", id, song_name)
      store.dispatch('updateMusicId', id)
      store.dispatch('updateMusicName', song_name) // 调用action更新全局变量的值
    }
  }
}

</script>
<style lang="">
.playlist-container {
  height: 835px;
  overflow: hidden;
}
</style>