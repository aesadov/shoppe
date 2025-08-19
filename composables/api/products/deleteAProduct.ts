import { useAxios } from '@/composables/api/axios'

export const useDeleteAProduct = async (id: number) => {
  const axiosInstance = useAxios()

  try {
    const response = await axiosInstance.delete<Product>(`/products/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting a product:', error)
    throw error
  }
}
