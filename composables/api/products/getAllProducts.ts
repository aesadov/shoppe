import { useAxios } from '~/composables/api/axios'
import type { Product } from '~/types/api'

export const useGetAllProducts = async (limit?: number) => {
  const axiosInstance = useAxios()

  try {
    const response = await axiosInstance.get<Product[]>('/products', { params: { limit } })
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}
