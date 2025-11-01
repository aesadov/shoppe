import { ref, onMounted, readonly } from 'vue'

export const useMobile = () => {
  const isMobile = ref(false)

  onMounted(() => {
    isMobile.value = window.innerWidth <= 768
  })

  return {
    isMobile: readonly(isMobile),
  }
}
