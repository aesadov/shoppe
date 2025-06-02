import {useAxios} from '@/composables/api/axios'
import type { AxiosInstance } from 'axios'

export const useGetASingleProduct = async (id: number): Promise<Product> => {
  const axiosInstance: AxiosInstance = useAxios();
  
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting a single product:', error);
    throw error;
  }
}