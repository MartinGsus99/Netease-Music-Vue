<template lang="">
  <div>
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
        <span class="title">{{ musicName() }}</span>
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
        <span v-if="!play" class="time-wrapper">00:00</span>
        <span v-if="play" class="time-wrapper"
          >{{ this.currentTime }}/{{ this.endTime }}</span
        >
        <el-icon><Bell color="white" /></el-icon>
        <span class="volumn-slider-wrapper">{{ this.volumn }}</span>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import { store } from '@/utils/store.js'
console.log("Musicname:", store.musicName)
export default {
  name: "Footer",
  data () {
    return {
      audioSrc: "",
      play: false,
      sliderValue: 0,
      volumn: 10,
      playListIndex: 0,
      endTime: "00:00",
      currentTime: "00:00",
      processBarLength: "",
    }
  },
  watch: {
    musicId: {
      handler (newVal, oldVal) {
        console.log(newVal, oldVal)
      },
      deep: true,
      immediate: true
    }
  },
  compouted: {
    musicName () {
      return store.musicName
    },
    musicId () {
      return store.musicId
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
        this.$message.error('播放列表空白')
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
    changeSlider () {
      this.timeLength = this.$refs.audio.duration
      let minutes = parseInt(this.timeLength / 60)
      let seconds = parseInt(this.timeLength % 60)
      this.endTime = minutes + ":" + seconds
      this.currentTime = "00:00"
      console.log("歌曲时长：", this.duration)

    },
    musicName () {
      return store.musicId + ' ' + store.musicName
    },
  },

}
</script>
<style lang="css">
.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.song_name {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font: 800;
  font-size: 15px;
  color: rgb(64, 158, 255);
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