import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    musicId: null,
    MusicName: '无' // 初始化全局变量
  },
  mutations: {
    updateMusicName (state, newValue) {
      state.MusicName = newValue // 更新全局变量的值
    },
    updateMusicId (state, newValue) {
      state.musicId = newValue // 更新全局变量的值
    }
  },
  actions: {
    updateMusicName ({ commit }, newValue) {
      commit('updateMusicName', newValue) // 调用mutation更新全局变量的值
    },
    updateMusicId ({ commit }, newValue) {
      commit('updateMusicId', newValue) // 调用mutation更新全局变量的值
    },
  },
  getters: {
    getMusicName (state) {
      return state.MusicName // 获取全局变量的值
    },
    getMusicId (state) {
      return state.musicId // 获取全局变量的值
    }
  }
})

export default store
