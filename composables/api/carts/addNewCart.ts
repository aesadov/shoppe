import {useAxios} from '@/composables/api/axios'
import type { AxiosInstance } from 'axios';


export const useAddNewCart = async (userId: number, products: Product[]): Promise<Cart> => {
  const axiosInstance: AxiosInstance = useAxios();
  const cart = {userId, products}
  
  try {
    const response = await axiosInstance.post<Cart>('/carts', cart);
    return response.data;
  } catch (error) {
    console.error('Error adding new cart:', error);
    throw error;
  }
}