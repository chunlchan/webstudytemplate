import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', () => {
  const pid = ref(null);

  return { pid }
}, {
  persist: true
})
