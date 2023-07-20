<template lang="">
  <Audio ref="audioPlayer" :songName="songName" :audioSrc="audioSrc"></Audio>
</template>

<script>
import store from '@/utils/store.js'
import Audio from '@/components/Audio/index.vue'
import axios from '@/utils/axios'
export default {
  name: "Footer",
  components: {
    Audio
  },
  data () {
    return {
      play: false,
      sliderValue: 0,
      volumn: 10,
      playListIndex: 0,
      endTime: "00:00",
      currentTime: "00:00",
      processBarLength: "",
      songName: "",
      audioSrc: null,
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
      this.queryMusicSource(newId)
    },
    musicName (newName) {
      this.songName = newName
    },
  },
  methods: {
    queryMusicSource (id) {
      this.axios.get('/check/music?id=' + id)
        .then((res) => {
          let data = res.data
          if (!data.success) {
            this.$message.error(data.message)
          } else {
            this.axios.get('/song/url/v1?id=' + id + '&level=hires')
              .then((res) => {
                if (res.data.code == 200) {
                  this.audioSrc = res.data.data[0].url
                  setTimeout(() => {
                    this.$message.success("加载成功~")
                  }, 500)
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
.audio-bar-wrapper {
  width: 90%;
  background-color: rgb(255, 255, 255);
  position: fixed;
  bottom: 0px;
}

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
