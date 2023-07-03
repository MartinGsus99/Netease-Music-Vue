<template>
  <div class="body-container">
    <el-scrollbar height="800px">
      <el-row :gutter="20">
        <el-col v-for="(o, index) in playLists" :key="o.id" :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="o.al.picUrl" class="image" />
            <div style="padding: 14px">
              <span>{{ o.name }}</span>
              <div class="bottom">
                <time class="time">{{ new Date(o.publishTime) }}</time>
                <el-button
                  text
                  class="button"
                  icon="ArrowRightBold"
                  @click="playMusic(o.id)"
                ></el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-scrollbar>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "MusicList",
  data () {
    return {
      currentDate: new Date().toLocaleDateString(),
      playLists: [
        // {
        //   id: 1,
        //   name: '歌单1',
        //   img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
        // },
        // {
        //   id: 2,
        //   name: '歌单2',
        //   img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
        // },
        // {
        //   id: 3,
        //   name: '歌单3',
        //   img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
        // },
        // {
        //   id: 4,
        //   name: '歌单4',
        //   img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
        // },
        // {
        //   id: 5,
        //   name: '歌单5',
        //   img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
        // },
        // {
        //   id: 6,
        //   name: '歌单6',
        //   img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
        // },
        // {
        //   id: 7,
        //   name: '歌单7',
        //   img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
        // },
        // {
        //   id: 8,
        //   name: '歌单8',
        //   img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
        // }

      ]
    }
  },
  methods: {
    load () {
      console.log('load')
    },
    loadPlayList (id) {
      axios
        .get('http://127.0.0.1:3000/playlist/detail?id=' + id)
        .then(response => (
          this.playLists = response.data.playlist.tracks
        ))
        .catch(function (error) { // 请求失败处理
          console.log(error)
        })
    },
    getTIme (timeStamp) {
      let date = new Date(timeStamp)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      return year + '-' + month + '-' + day
    },
    playMusic (id) {
      console.log(id)
    }
  },
  mounted () {
    this.loadPlayList(24381616)
  }
};
</script>

<style>
.body-container {
  margin-top: 20px;
  margin-bottom: 20px;
}

.body-container .el-scrollbar {
  overflow-x: hidden;
}

.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
