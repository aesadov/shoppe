import { useAxios } from '@/composables/api/axios'

export const useGetASingleProduct = async (id: number) => {
  const axiosInstance = useAxios()

  try {
    const response = await axiosInstance.get<Product>(`/products/${id}`)
    return response.data
  } catch (error) {
    console.error('Error getting a single product:', error)
    throw error
  }
}
