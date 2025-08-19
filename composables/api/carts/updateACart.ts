import { useAxios } from '@/composables/api/axios'

export const useUpdateACart = async (cart: Cart) => {
  const axiosInstance = useAxios()

  try {
    const response = await axiosInstance.put<Cart>(`/carts/${cart.id}`, cart)
    return response.data
  } catch (error) {
    console.error('Error updating a cart:', error)
    throw error
  }
}
