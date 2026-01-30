import { useFetchApi } from '~/composables/api/useFetchApi'
import type { Product } from '~/types/api'

export const useGetProduct = () => {
  const { fetchApi } = useFetchApi()

  const getProduct = async (id: number): Promise<Product | null> => {
    return await fetchApi<Product>(`/products/${id}`, { method: 'GET' })
  }

  return { getProduct }
}
