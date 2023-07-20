<template>
  <div class="card">
    <div class="card-content">
      <h2 class="card-title">{{ songName }}</h2>
      <div class="player-controls">
        <input
          type="range"
          class="progress-bar"
          v-model="progress"
          min="0"
          :max="totalDuration"
        />
        <div class="control-buttons">
          <button class="player-button" @click="previousTrack">Previous</button>
          <button class="player-button fixed-width" @click="playPause">
            {{ isPlaying ? "Pause" : "Play" }}
          </button>
          <button class="player-button" @click="nextTrack">Next</button>
        </div>
      </div>
      <audio
        ref="audioPlayer"
        :src="currentTrack.url"
        @timeupdate="updateProgress"
        autoplay
      ></audio>
    </div>
  </div>
</template>

<script>
export default {
  name: "Audio",
  props: {
    songName: {
      default: '未播放',
      type: String
    },
    audioSrc: {
      default: null,
      type: String
    },
  },
  data () {
    return {
      isPlaying: false,
      progress: 0,
      totalDuration: 0,
      currentTrack: {
        url: 'http://m8.music.126.net/20230719172740/18937dacd680e23dcbf982797dea5610/ymusic/c48c/fb99/1950/a0634034446f904929e37dc2686ba91b.mp3'
      }
    }
  },
  mounted () {
    this.$refs.audioPlayer.addEventListener('loadedmetadata', () => {
      this.totalDuration = this.$refs.audioPlayer.duration
    })
  },
  methods: {
    playPause () {
      if (this.isPlaying) {
        this.$refs.audioPlayer.pause()
      } else {
        this.$refs.audioPlayer.play()
      }
      this.isPlaying = !this.isPlaying
    },
    previousTrack () {
      // 处理上一首逻辑
    },
    nextTrack () {
      // 处理下一首逻辑
    },
    updateProgress () {
      this.progress = this.$refs.audioPlayer.currentTime
    }
  }
};
</script>

<style>
.card {
  background: linear-gradient(to bottom right, #acc5e6, #1bdfc2);
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 99%;
  height: 150px;
  margin: 0 auto; /* 居中显示 */
  padding: 20px;
  display: flex; /* 使用 flex 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-content {
  margin-bottom: 20px;
  position: relative;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  color: white;
}

.player-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.progress-bar {
  width: 100%;
}

.control-buttons {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.player-button {
  background: linear-gradient(to bottom right, #acc5e6, #1bdfc2);
  color: #fff;
  border: 1px solid #1bdfc2;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 12px 24px; /* 调整按钮尺寸 */
  margin: 0 10px; /* 调整按钮间距 */
  cursor: pointer;
  font-size: 20px;
}

.player-button.fixed-width {
  width: 120px; /* 根据实际需要设置合适的固定宽度 */
}

.volume-control {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0, -50%);
  display: flex;
  align-items: center;
}

.volume-control label {
  margin-right: 10px;
}
</style>
