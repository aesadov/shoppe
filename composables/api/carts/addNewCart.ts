import {useAxios} from '@/composables/api/axios'


export const useAddNewCart = async (userId: number, products: Product[]) => {
  const axiosInstance = useAxios();
  const cart = {userId, products}
  
  try {
    const response = await axiosInstance.post<Cart>('/carts', cart);
    return response.data;
  } catch (error) {
    console.error('Error adding new cart:', error);
    throw error;
  }
}