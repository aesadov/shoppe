import {useAxios} from '@/composables/api/axios'
import type { AxiosInstance } from 'axios'

export const useDeleteACart = async (id: number): Promise<Cart> => {
  const axiosInstance: AxiosInstance = useAxios();
  
  try {
    const response = await axiosInstance.delete(`/carts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting a cart:', error);
    throw error;
  }
}