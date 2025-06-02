import {useAxios} from '@/composables/api/axios'
import type { AxiosInstance } from 'axios'

export const useAddNewPropduct = async (product: Product): Promise<Product> => {
  const axiosInstance: AxiosInstance = useAxios();
  
  try {
    const response = await axiosInstance.post<Product>('/products', product);
    return response.data;
  } catch (error) {
    console.error('Error adding new product:', error)
    throw error
  }
}