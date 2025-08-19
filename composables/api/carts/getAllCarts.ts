import { useAxios } from '@/composables/api/axios'

export const useGetAllCarts = async () => {
  const axiosInstance = useAxios()

  try {
    const response = await axiosInstance.get<Cart[]>('/carts')
    return response.data
  } catch (error) {
    console.error('Error fetching carts:', error)
    throw error
  }
}
