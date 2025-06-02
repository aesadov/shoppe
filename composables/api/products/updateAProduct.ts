import {useAxios} from '@/composables/api/axios'
import type { AxiosInstance } from 'axios'

export const useUpdateAPropduct = async (product: Product): Promise<Product> => {
  const axiosInstance: AxiosInstance = useAxios();
  
  try {
    const response = await axiosInstance.put(`/products/${product.id}`, product);
    return response.data;
  } catch (error) {
    console.error('Error updating a product:', error);
    throw error;
  }
}