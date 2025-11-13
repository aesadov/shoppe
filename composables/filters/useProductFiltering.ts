import type { FiltersState } from '~/types/filters'
import type { Ref } from 'vue'
import type { Product } from '@/types/api'

const MIN_STOCK_COUNT = 0
const DISCOUNT = 50

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
        case 'price-asc':
          filtered.sort((a, b) => a.price - b.price)
          break
        case 'price-desc':
          filtered.sort((a, b) => b.price - a.price)
          break
        case 'name-asc':
          filtered.sort((a, b) => a.title.localeCompare(b.title))
          break
        case 'name-desc':
          filtered.sort((a, b) => b.title.localeCompare(a.title))
          break
        case 'newest':
          filtered.sort((a, b) => b.id - a.id)
          break
        case 'rating-desc':
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
    applyFilters,
    getFilteredProducts,
  }
}
