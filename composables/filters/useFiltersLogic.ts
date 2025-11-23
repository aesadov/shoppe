import type { FiltersState, SelectOption } from '~/types/filters'

export const useFiltersLogic = (props: {
  filters: FiltersState
  categories?: SelectOption[]
  sortOptions?: SelectOption[]
  minPriceLimit?: number
  maxPriceLimit?: number
}) => {
  const { minPriceLimit = 0, maxPriceLimit = 500 } = props

  const localFilters = reactive<FiltersState>({ ...props.filters })

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

  return {
    localFilters,
    updatePriceRange,
    resetFilters,
  }
}
