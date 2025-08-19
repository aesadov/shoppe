import { useAxios } from '@/composables/api/axios'

export const useUpdateAPropduct = async (product: Product) => {
  const axiosInstance = useAxios()

  try {
    const response = await axiosInstance.put<Product>(`/products/${product.id}`, product)
    return response.data
  } catch (error) {
    console.error('Error updating a product:', error)
    throw error
  }
}
