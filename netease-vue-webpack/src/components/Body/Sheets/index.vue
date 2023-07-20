<template>
  <div>
    <div class="body-container">
      <el-scrollbar v-show="!playlistShow" height="800px">
        <el-row :gutter="80">
          <el-col v-for="(o, index) in sheets" :key="o.id" :span="6">
            <el-card :body-style="{ padding: '0px' }" class="card_item">
              <img
                :src="o.coverImgUrl || ''"
                @click="showSheetSongs(o.id)"
                class="image"
              />
              <div style="padding: 14px">
                <span class="song_name">{{ o.name || "Null" }}</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import axios from "@/utils/axios.js"
export default {
  name: "Body",
  data () {
    return {
      currentDate: new Date().toLocaleDateString(),
      picUrl: "",
      playlistShow: false,
      sheets: [],
      playlist: [],
      duration: 0,
      rowGutter: [30, 30], // 第一个值表示水平间距，第二个值表示垂直间距
      colSpan: 6, // 每个卡片所占的栅格数
    }
  },
  methods: {
    loadPlaySheets (styleTag) {
      let url1 = '/top/playlist/highquality?cat= 民谣&limit=100'
      let url2 = '/top/playlist/hot'
      let url3 = '/user/playlist?uid=' + 418165896

      this.axios
        .get(url3)
        .then((response) => (
          console.log(response.data.playlist),
          this.sheets = response.data.playlist
        ))
        .catch(function (error) { // 请求失败处理
          console.log(error)
        })
    },

    showSheetSongs (sheetId) {
      console.log("跳转..." + sheetId)
      this.$router.push({
        path: `/home/playlist/${sheetId}`,
        params: {
          id: sheetId
        }
      }).then(() => {
        console.log("~~~~")
      }).catch(() => {
        console.log("!!!!")
      })
    },

    getTIme (timeStamp) {
      let date = new Date(timeStamp)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      return year + '-' + month + '-' + day
    },

  },
  mounted () {
    this.loadPlaySheets(24381616)
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

.control-button-container {
  text-align: left;
  width: 120px;
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

.card_item :hover {
  cursor: pointer;
}

.card-item {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
