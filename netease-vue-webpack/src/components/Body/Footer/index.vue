<template lang="">
<div>
  <div class="audio-bar-wrapper">
    <div class="icon-wrapper">
      <div class="button-wrapper">
        <i class="el-icon-d-arrow-left" style="color: white" @click="preSong"></i>
      </div>
      <div class="button-wrapper">
        <i v-if="play" class="el-icon-video-play" style="color: white" @click="pause"></i>
        <i v-if="!play" class="el-icon-video-pause" style="color: white" @click="pause"></i>
      </div>
      <div class="button-wrapper">
        <i class="el-icon-d-arrow-right" style="color: white" @click="nextSong"></i>
      </div>
    </div>

    <div class="slider-wrapper">
      <span class="title">{{ musicName }}</span>
      <div class="slider-container">
        <el-slider v-model="sliderValue" :min="0" :max="100" :step="1" style="
               {
                --el-slider-main-bg-color: #5240ff;
              }
            " @change=""></el-slider>
      </div>
    </div>

    <div class="volumn-wrapper">
      <span v-if="!play" class="time-wrapper">00:00</span>
      <span v-if="play" class="time-wrapper">{{ this.currentTime }}/{{ this.endTime }}</span>
      <i class="el-icon-bell" style="color: white" @click=""></i>
      <span class="volumn-slider-wrapper">{{ this.volumn }}</span>
    </div>
  </div>

</div>


</template>

<script>
import store from '@/utils/store.js'

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
      audio: {
        name: '东西（Cover：林俊呈）',
        artist: '纳豆',
        url: 'https://cdn.moefe.org/music/mp3/thing.mp3',
        cover: 'https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300', // prettier-ignore
        lrc: 'https://cdn.moefe.org/music/lrc/thing.lrc',
      },
    }
  },
  computed: {
    musicName () {
      return store.getters.getMusicName
    },
    musicId () {
      return store.getters.getMusicId
    }
  },
  watch: {
    musicId (newId) {
      // musicName发生变化时的响应逻辑
      console.log('musicName changed:', newId)
      this.queryMusicSource(newId)
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
    queryMusicSource (id) {
      this.axios.get('http://127.0.0.1:3000/check/music?id=' + 33894312)
        .then((res) => {
          let data = res.data
          if (!data.success) {
            this.$message.error(data.message)
          } else {
            this.axios.get('http://127.0.0.1:3000/song/url/v1?id=' + 33894312 + '&level=lossless')
              .then((res) => {
                console.log(res.data.code)
                if (res.data.code == 200) {
                  this.audioSrc = res.data.url
                  // this.$refs.audio.volumn = 20
                  // this.$refs.audio.load()
                  setTimeout(() => {
                    this.$message.success("加载成功~")
                    // this.$refs.audio.play()
                  }, 2000)
                } else {
                  this.$message.error("没有获取到资源链接~")
                }
              })
          }
        })
    }
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
