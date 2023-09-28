import { defineStore } from 'pinia'
import { ref } from 'vue'

export const mainStore = defineStore('main', () => {

  //左侧菜单是否绽开状态 true为展开 false为折叠
  const isLeftCollapse = ref(true)


  return { isLeftCollapse }

})
