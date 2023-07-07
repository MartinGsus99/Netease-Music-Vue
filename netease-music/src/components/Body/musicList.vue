<template>
  <div>
    <div class="body-container">
      <el-scrollbar height="800px">
        <el-row :gutter="20">
          <el-col v-for="(o, index) in playLists" :key="o.id" :span="6">
            <el-card
              @click="playMusic(o.id)"
              :body-style="{ padding: '0px' }"
              class="card_item"
            >
              <img :src="o.al.picUrl" class="image" />
              <div style="padding: 14px">
                <span class="song_name">{{ o.name }}</span>
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

    <div class="audio-bar-wrapper">
      <el-row justify="space-around" class="audio-bar-container">
        <el-col :span="1">
          <el-icon @click="preSong" class="button">
            <ArrowLeftBold color="white" />
          </el-icon>
        </el-col>
        <el-col :span="1">
          <el-icon v-if="play" @click="pause" class="button">
            <VideoPause color="white" />
          </el-icon>
          <el-icon v-if="!play" @click="pause" class="button">
            <VideoPlay color="white" />
          </el-icon>
        </el-col>
        <el-col :span="1">
          <el-icon @click="nextSong" class="button">
            <ArrowRightBold color="white" />
          </el-icon>
        </el-col>
        <el-col :span="18">
          <audio ref="audio" :src="audioSrc"></audio>

          <el-slider
            v-model="sliderValue"
            :show-tooltip="false"
            @change="changeSlider"
            :step="0.1"
          />
        </el-col>
        <el-col :span="2">
          <el-popover placement="top-start" :width="50" trigger="hover">
            <el-slider
              v-model="volumn"
              :show-tooltip="false"
              @change="changeVolumn"
              :step="5"
              vertical
              height="120px"
            />
            <template #reference>
              <el-button class="m-2" type="primary">
                <el-icon class="button">
                  <BellFilled color="white" />
                </el-icon>
              </el-button>
            </template>
            <template></template>
          </el-popover>
        </el-col>
        <el-col :span="1">
          <div class="volumn-style">{{ this.volumn }}</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import axios from 'axios'
export default {
  name: "MusicList",
  data () {
    return {
      currentDate: new Date().toLocaleDateString(),
      audioSrc: "",
      playLists: [],
      singer: "",
      picUrl: "",
      play: false,
      duration: 0,
      endTime: "",
      currentTime: "",
      sliderValue: 0,
      volumn: 10,
      playList: [],
      playListIndex: 0,
      sliderValue: 0,
    }
  },
  methods: {
    load () {
      console.log('load')
    },
    preSong () {
      console.log("preSong")
      this.$refs.audio.pause()
      if (this.playListIndex > 0) {
        this.playListIndex--
      } else {
        this.playListIndex = this.playList.length - 1
      }
      this.$refs.audio.play()
    },
    pause () {
      if (this.audioSrc == "") {
        ElMessage.error('播放列表空白')
        return
      }
      this.play = !this.play
      this.$refs.audio.volumn = this.volumn
      if (this.play) {
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }

    },
    nextSong () {
      console.log("nextSong")
      this.$refs.audio.pause()
      if (this.playListIndex < this.playList.length - 1) {
        this.playListIndex++
      } else {
        this.playListIndex = 0
      }
      this.$refs.audio.play()
    },
    changeVolumn (val) {
      this.$refs.audio.volume = val / 100
      console.log(this.$refs.audio.volume)
    },
    changeSlider () {

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
      axios.get('http://127.0.0.1:3000/check/music?id=' + id)
        .then((res) => {
          console.log(res)
          if (res.data.message == "ok") {
            console.log("Playing")
            this.loadingSourceToAudioPlayer(id)
          } else {
            ElMessage.error(res.data.message)
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    loadingSourceToAudioPlayer (id) {
      axios.get('http://127.0.0.1:3000/song/url/v1?id=' + id + '&level=exhigh')
        .then((res) => {
          console.log(res.data.data[0].url)
          this.$refs.audio.pause()
          this.audioSrc = res.data.data[0].url
          this.$refs.audio.load()
          setTimeout(() => {
            ElMessage.success('歌曲加载完成~')
            this.$refs.audio.play()
          }, 1000)
        }).catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.loadPlayList(24381616)
  }
};
</script>

<style>
.audio-bar-wrapper {
  width: 100%;
  height: 70px;
  background-color: rgb(64, 158, 255);
  position: fixed;
  padding: 30px 0 30px 0;
  bottom: 0px;
  left: 0px;
}

.audio-bar-container {
  width: 100%;
  height: 100%;
  padding: 30px 0 30px 0;
}

.button:hover {
  cursor: pointer;
  background-color: antiquewhite;
}

.volumn-style {
  color: white;
  align-items: center;
  padding: 6px 0px;
}

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

.song_name {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font: 800;
  font-size: 30px;
  color: rgb(64, 158, 255);
}

.card_item :hover {
  cursor: pointer;
}
</style>
