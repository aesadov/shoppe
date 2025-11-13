import type { FiltersState, SelectOption } from '~/types/filters'

export const useFiltersLogic = (
  props: {
    filters: FiltersState
    categories?: SelectOption[]
    sortOptions?: SelectOption[]
    minPriceLimit?: number
    maxPriceLimit?: number
  },
  emit: (event: 'filters-change', filters: FiltersState) => void,
) => {
  const { minPriceLimit = 0, maxPriceLimit = 500 } = props

  const localFilters = reactive<FiltersState>({ ...props.filters })

  watch(
    localFilters,
    (newFilters) => {
      emit('filters-change', newFilters)
    },
    { deep: true },
  )

  watch(
    () => props.filters,
    (newFilters) => {
      Object.assign(localFilters, newFilters)
    },
    { deep: true },
  )

  const updateMinPrice = (event: Event) => {
    const value = Number((event.target as HTMLInputElement).value)
    localFilters.minPrice = Math.min(value, localFilters.maxPrice)
  }

  const updateMaxPrice = (event: Event) => {
    const value = Number((event.target as HTMLInputElement).value)
    localFilters.maxPrice = Math.max(value, localFilters.minPrice)
  }

  const resetFilters = () => {
    Object.assign(localFilters, {
      search: '',
      category: '',
      sortBy: '',
      minPrice: minPriceLimit,
      maxPrice: maxPriceLimit,
      onSale: false,
      inStock: false,
    })
  }

  const sliderTrackStyle = computed(() => {
    const range = maxPriceLimit - minPriceLimit
    const minPercent = ((localFilters.minPrice - minPriceLimit) / range) * 100
    const maxPercent = ((localFilters.maxPrice - minPriceLimit) / range) * 100

    return {
      background: `linear-gradient(to right,
        #ddd ${minPercent}%,
        #000000 ${minPercent}%,
        #000000 ${maxPercent}%,
        #ddd ${maxPercent}%)`,
    }
  })

  const generateUniqueId = (prefix: string) =>
    `${prefix}-${Math.random().toString(36).substring(2, 11)}`

  return {
    localFilters,
    updateMinPrice,
    updateMaxPrice,
    resetFilters,
    sliderTrackStyle,
    generateUniqueId,
  }
}
