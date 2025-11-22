export const useMobileFilters = () => {
  const isShowMobFilters = ref(false)

  const toggleShowMobFilters = () => {
    isShowMobFilters.value = !isShowMobFilters.value
  }

  const closeMobFilters = () => {
    isShowMobFilters.value = false
  }

  return {
    isShowMobFilters,
    toggleShowMobFilters,
    closeMobFilters,
  }
}
