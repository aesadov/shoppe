import type { FiltersState } from '~/types/filters'
import type { Ref } from 'vue'
import type { Product } from '@/types/api'

const MIN_STOCK_COUNT = 0
const DISCOUNT = 50

const enum SortType {
  PRICE_ASC = 'price-asc',
  PRICE_DESC = 'price-desc',
  NAME_ASC = 'name-asc',
  NAME_DESC = 'name-desc',
  NEWEST = 'newest',
  RATING_DESC = 'rating-desc',
}

export const useProductFiltering = (products: Ref<Product[] | null>) => {
  const applyFilters = (productsList: Product[], filters: FiltersState) => {
    let filtered = [...productsList]

    if (filters.category) {
      filtered = filtered.filter((product) => product.category === filters.category)
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter((product) => product.title.toLowerCase().includes(searchLower))
    }

    filtered = filtered.filter(
      (product) => product.price >= filters.minPrice && product.price <= filters.maxPrice,
    )

    if (filters.inStock) {
      filtered = filtered.filter(
        (product) => product.rating?.count && product.rating.count > MIN_STOCK_COUNT,
      )
    }

    if (filters.onSale) {
      filtered = filtered.filter((product) => product.price < DISCOUNT)
    }

    if (filters.sortBy) {
      switch (filters.sortBy) {
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

  const getFilteredProducts = (filters: FiltersState) => {
    if (!products.value) return []
    return applyFilters(products.value, filters)
  }

  return {
    getFilteredProducts,
  }
}
