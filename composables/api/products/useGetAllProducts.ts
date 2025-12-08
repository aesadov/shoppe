import { useApiFetch } from '~/composables/api/useApiFetch'
import type { Product } from '~/types/api'
export const useGetAllProducts = (params: { limit?: number; category?: string } = {}) => {
  const { category, limit } = params
  const url = category ? `/products/category/${category}` : '/products'
  return useApiFetch<Product[]>(url, {
    params: {
      limit,
    },
  })
}
