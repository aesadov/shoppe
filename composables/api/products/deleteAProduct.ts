import {useAxios} from '@/composables/api/axios'
import type { AxiosInstance } from 'axios'

export const useDeleteAProduct = async (id: number): Promise<Product> => {
  const axiosInstance: AxiosInstance = useAxios();
  
  try {
    const response = await axiosInstance.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting a product:', error);
    throw error;
  }
}