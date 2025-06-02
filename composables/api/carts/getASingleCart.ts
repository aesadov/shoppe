import {useAxios} from '@/composables/api/axios'
import type { AxiosInstance } from 'axios'

export const useGetASingleCart = async (id: number): Promise<Cart>=> {
  const axiosInstance: AxiosInstance = useAxios();
  
  try {
    const response = await axiosInstance.get(`/carts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting a single cart:', error);
    throw error;
  }
}