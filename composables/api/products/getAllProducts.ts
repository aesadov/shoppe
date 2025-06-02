import {useAxios} from '@/composables/api/axios'
import type { AxiosInstance } from 'axios';

export const useGetAllProducts = async (): Promise<Product[]> => {
  const axiosInstance: AxiosInstance = useAxios();
  
  try {
    const response = await axiosInstance.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}