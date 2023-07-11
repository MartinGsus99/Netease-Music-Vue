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
                  <el-button text icon="ArrowRightBold"></el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-scrollbar>
    </div>

    <div class="audio-bar-wrapper">
      <div class="icon-wrapper">
        <div class="button-wrapper">
          <el-icon @click="preSong" class="button">
            <ArrowLeftBold color="white" />
          </el-icon>
        </div>
        <div class="button-wrapper">
          <el-icon v-if="play" @click="pause" class="button">
            <VideoPause color="white" />
          </el-icon>
          <el-icon v-if="!play" @click="pause" class="button">
            <VideoPlay color="white" />
          </el-icon>
        </div>
        <div class="button-wrapper">
          <el-icon @click="nextSong" class="button">
            <ArrowRightBold color="white" />
          </el-icon>
        </div>
      </div>

      <audio ref="audio" :src="audioSrc"></audio>

      <div class="slider-wrapper">
        <span class="title">{{ "相遇" }}</span>
        <div class="slider-container">
          <el-slider
            v-model="sliderValue"
            :min="0"
            :max="100"
            :step="1"
            style="
               {
                --el-slider-main-bg-color: #5240ff;
              }
            "
            @change="changeSlider"
          ></el-slider>
        </div>
      </div>

      <div class="volumn-wrapper">
        <span v-if="!play" class="time-wrapper">未播放歌曲</span>
        <span v-if="play" class="time-wrapper"
          >{{ this.currentTime }}/{{ this.endTime }}</span
        >
        <el-icon><Bell color="white" /></el-icon>
        <span class="volumn-slider-wrapper">{{ this.volumn }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ElMessage
} from 'element-plus'
import axios from 'axios'
export default {
  name: "MusicList",
  data () {
    return {
      currentDate: new Date().toLocaleDateString(),
      audioSrc: "",
      playLists: [],
      picUrl: "",
      play: false,
      sliderValue: 0,
      volumn: 10,
      playListIndex: 0,
      duration: 0,
      endTime: "00:00",
      currentTime: "00:00",
      processBarLength: "",
      musicName: "",
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
      if (this.$refs.audio.paused) {
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
          console.log(res.data)
          this.$refs.audio.pause()
          this.audioSrc = res.data.data[0].url
          this.$refs.audio.load()
          setTimeout(() => {
            ElMessage.success('歌曲加载完成~')
            this.changeSlider()
            this.musicName = res.data.data[0].id
            this.$refs.audio.play()
          }, 1000)
          this.play = true
        }).catch((err) => {
          console.log(err)
        })
    },

    onChangeSlider () {

    },

    changeSlider () {
      this.timeLength = this.$refs.audio.duration
      let minutes = parseInt(this.timeLength / 60)
      let seconds = parseInt(this.timeLength % 60)
      this.endTime = minutes + ":" + seconds
      this.currentTime = "00:00"
      console.log("歌曲时长：", this.duration)

    },
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
  width: 20px;
  height: 20px;
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

.audio-bar-wrapper {
  width: 100%;
  height: 70px;
  background-color: rgb(64, 158, 255);
  position: fixed;
  padding: 30px 0 30px 0;
  bottom: 0px;
  left: 0px;
  display: flex;
  flex-direction: row;
}

.audio-bar-wrapper .icon-wrapper {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  padding: 30px 0 30px 0;
}

.audio-bar-wrapper .icon-wrapper .button-wrapper {
  cursor: pointer;
  width: 100%;
  height: 100%;
  flex-flow: 1;
}

.audio-bar-wrapper .slider-wrapper {
  flex-grow: 3;
  padding: 0px 0 30px 0;
}

.audio-bar-wrapper .slider-wrapper .title {
  color: white;
  text-align: center;
}

.audio-bar-wrapper .volumn-wrapper {
  flex-grow: 1;
  padding: 25px 0 30px 0;
  display: flex;
  flex-direction: row;
}

.audio-bar-wrapper .volumn-wrapper .time-wrapper {
  flex-grow: 1;
  color: white;
}

.audio-bar-wrapper .volumn-wrapper .volumn-slider-wrapper {
  flex-grow: 1;
  padding: 0px 0 0px 0;
  color: white;
  text-align: left;
}
</style>
