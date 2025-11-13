import type { FiltersState } from '~/types/filters'
import { useRoute, useRouter } from 'nuxt/app'

export const useProductFilters = () => {
  const route = useRoute()
  const router = useRouter()

  const filters = reactive<FiltersState>({
    search: '',
    category: '',
    sortBy: '',
    minPrice: 0,
    maxPrice: 500,
    onSale: false,
    inStock: false,
  })

  const updateFiltersFromQuery = () => {
    const query = route.query

    if (query.search) filters.search = String(query.search)
    if (query.category) filters.category = String(query.category)
    if (query.sortBy) filters.sortBy = String(query.sortBy)
    if (query.minPrice) filters.minPrice = Number(query.minPrice)
    if (query.maxPrice) filters.maxPrice = Number(query.maxPrice)
    if (query.onSale) filters.onSale = query.onSale === 'true'
    if (query.inStock) filters.inStock = query.inStock === 'true'
  }

  const updateQueryParams = (newFilters: FiltersState) => {
    const query: Record<string, string> = {}

    if (newFilters.search) query.search = newFilters.search
    if (newFilters.category) query.category = newFilters.category
    if (newFilters.sortBy) query.sortBy = newFilters.sortBy
    if (newFilters.minPrice > 0) query.minPrice = newFilters.minPrice.toString()
    if (newFilters.maxPrice < 500) query.maxPrice = newFilters.maxPrice.toString()
    if (newFilters.onSale) query.onSale = newFilters.onSale.toString()
    if (newFilters.inStock) query.inStock = newFilters.inStock.toString()

    router.replace({ query })
  }

  const initFilters = () => {
    updateFiltersFromQuery()
  }

  return {
    filters,
    updateFiltersFromQuery,
    updateQueryParams,
    initFilters,
  }
}
