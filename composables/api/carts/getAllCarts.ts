import {useAxios} from '@/composables/api/axios'
import type { AxiosInstance } from 'axios';


export const useGetAllCarts = async (): Promise<Cart[]> => {
  const axiosInstance: AxiosInstance = useAxios();
  
  try {
    const response = await axiosInstance.get('/carts');
    return response.data;
  } catch (error) {
    console.error('Error fetching carts:', error);
    throw error;
  }
}