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

  const updatePriceRange = (min: number, max: number) => {
    localFilters.minPrice = min
    localFilters.maxPrice = max
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

  const generateUniqueId = (prefix: string) =>
    `${prefix}-${Math.random().toString(36).substring(2, 11)}`

  return {
    localFilters,
    updatePriceRange,
    resetFilters,
    generateUniqueId,
  }
}
