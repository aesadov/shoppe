import type { FiltersState, SelectOption } from '~/types/filters'
import type { Ref } from 'vue'
import type { Product } from '~/types/api'
import { useRoute, useRouter } from 'nuxt/app'

const MIN_STOCK_COUNT = 0
const DISCOUNT = 50
const MAX_PRICE_LIMIT = 500

const enum SortType {
  PRICE_ASC = 'price-asc',
  PRICE_DESC = 'price-desc',
  NAME_ASC = 'name-asc',
  NAME_DESC = 'name-desc',
  NEWEST = 'newest',
  RATING_DESC = 'rating-desc',
}

export const useProductFilters = (products?: Ref<Product[] | null>) => {
  const route = useRoute()
  const router = useRouter()

  const filters = reactive<FiltersState>({
    search: '',
    category: '',
    sortBy: '',
    minPrice: 0,
    maxPrice: MAX_PRICE_LIMIT,
    onSale: false,
    inStock: false,
  })

  const updateFiltersFromQuery = () => {
    const query = route.query

    if (query.search) filters.search = String(query.search)
    if (query.category) {
      filters.category = String(query.category)
    }
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
    if (newFilters.maxPrice < MAX_PRICE_LIMIT) query.maxPrice = newFilters.maxPrice.toString()
    if (newFilters.onSale) query.onSale = newFilters.onSale.toString()
    if (newFilters.inStock) query.inStock = newFilters.inStock.toString()

    router.replace({ query })
  }

  const applyFilters = (productsList: Product[], filtersToApply: FiltersState) => {
    let filtered = [...productsList]

    if (filtersToApply.search) {
      const searchLower = filtersToApply.search.toLowerCase()
      filtered = filtered.filter((product) => product.title.toLowerCase().includes(searchLower))
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= filtersToApply.minPrice && product.price <= filtersToApply.maxPrice,
    )

    if (filtersToApply.inStock) {
      filtered = filtered.filter(
        (product) => product.rating?.count && product.rating.count > MIN_STOCK_COUNT,
      )
    }

    if (filtersToApply.onSale) {
      filtered = filtered.filter((product) => product.price < DISCOUNT)
    }

    if (filtersToApply.sortBy) {
      switch (filtersToApply.sortBy) {
        case SortType.PRICE_ASC:
          filtered.sort((a, b) => a.price - b.price)
          break
        case SortType.PRICE_DESC:
          filtered.sort((a, b) => b.price - a.price)
          break
        case SortType.NAME_ASC:
          filtered.sort((a, b) => a.title.localeCompare(b.title))
          break
        case SortType.NAME_DESC:
          filtered.sort((a, b) => b.title.localeCompare(a.title))
          break
        case SortType.NEWEST:
          filtered.sort((a, b) => b.id - a.id)
          break
        case SortType.RATING_DESC:
          filtered.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
          break
      }
    }

    return filtered
  }

  const getFilteredProducts = (filtersToApply: FiltersState = filters) => {
    if (!products?.value) return []
    return applyFilters(products.value, filtersToApply)
  }

  const useFiltersLogic = (props: {
    filters: FiltersState
    categories?: string[]
    sortOptions?: SelectOption[]
    minPriceLimit?: number
    maxPriceLimit?: number
  }) => {
    const { minPriceLimit = 0, maxPriceLimit = MAX_PRICE_LIMIT } = props

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

  return {
    filters,

    updateFiltersFromQuery,
    updateQueryParams,

    getFilteredProducts,
    applyFilters,

    useFiltersLogic,

    MAX_PRICE: MAX_PRICE_LIMIT,
  }
}
