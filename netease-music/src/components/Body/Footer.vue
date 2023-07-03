<template lang="">
  <div>
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
          <audio ref="audio" :src="audioSrc">
          </audio>
          <el-slider v-model="sliderValue" :show-tooltip="false" @change="changeSlider" :step="0.1" />
        </el-col>
        <el-col :span="2">
          <el-popover placement="top-start" :width="50" trigger="hover">
            <el-slider v-model="volumn" :show-tooltip="false" @change="changeVolumn" :step="5" vertical height="120px" />
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
          <div class="volumn-style">{{this.volumn}}</div>
        </el-col>
      </el-row>
    </div>
  </div>
  </template>
  
  <script>
import MusicList from "./musicList.vue"
export default {
  name: 'Body',
  comments: {
    MusicList
  },
  data () {
    return {
      audioSrc: "",
      title: "当前没有歌曲",
      singer: "",
      picUrl: "",
      play: false,
      duration: 0,
      endTime: "",
      currentTime: "",
      sliderValue: 0,
      volumn: 0,
      playList: [],
      playListIndex: 0,
      sliderValue: 0,

    }
  },
  methods: {
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
      this.play = !this.play
      this.$refs.audio.src = this.audioSrc
      this.$nextTick(res => {
        this.$refs.audio.load()
      })
      if (this.play) {
        this.$refs.audio.play().then(() => {
          console.log("play")
        }).catch((err) => {
          console.log(err)
          this.$refs.audio.play()
        })
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

    }
  }
}
  </script>
  
  <style lang="css">
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
</style>
  