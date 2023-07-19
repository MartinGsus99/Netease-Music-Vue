import { reactive } from "vue"

console.log("Store loaded...")

export const store = reactive({
  musicId: 0,
  musicName: "",
  changeMusicName (newName) {
    this.musicName = newName
  },
  changeMusicId (newId) {
    this.musicId = newId
  }
})