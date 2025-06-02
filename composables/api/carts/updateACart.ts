import {useAxios} from '@/composables/api/axios'
import type { AxiosInstance } from 'axios'

export const useUpdateACart = async (cart: Cart): Promise<Cart> => {
  const axiosInstance: AxiosInstance = useAxios();
  
  try {
    const response = await axiosInstance.put(`/carts/${cart.id}`, cart);
    return response.data;
  } catch (error) {
    console.error('Error updating a cart:', error);
    throw error;
  }
}