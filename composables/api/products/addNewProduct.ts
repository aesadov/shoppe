import {useAxios} from '@/composables/api/axios'

export const useAddNewPropduct = async (product: Product) => {
  const axiosInstance = useAxios();
  
  try {
    const response = await axiosInstance.post<Product>('/products', product);
    return response.data;
  } catch (error) {
    console.error('Error adding new product:', error)
    throw error
  }
}