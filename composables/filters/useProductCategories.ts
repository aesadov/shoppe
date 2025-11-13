import type { Product } from '~/types/api'
import type { Ref } from 'vue'

export const useProductCategories = (products: Ref<Product[] | null>) => {
  const categories = computed(() => {
    if (!products.value) return []

    const uniqueCategories = [...new Set(products.value.map((product) => product.category))]
    return uniqueCategories.map((category) => ({
      value: category,
      label: category.charAt(0).toUpperCase() + category.slice(1).replace(/'/g, "'"),
    }))
  })

  return {
    categories,
  }
}
