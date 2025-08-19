import { useAxios } from '@/composables/api/axios'

export const useGetAllProducts = async () => {
  const axiosInstance = useAxios()

  try {
    const response = await axiosInstance.get<Product[]>('/products')
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}
