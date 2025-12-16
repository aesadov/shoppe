import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const isShowCart = ref<boolean>(false)
  function toggleSidebar() {
    isShowCart.value = !isShowCart.value
  }

  return { isShowCart, toggleSidebar }
})
