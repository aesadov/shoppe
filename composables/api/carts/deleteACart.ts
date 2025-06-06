import {useAxios} from '@/composables/api/axios'

export const useDeleteACart = async (id: number) => {
  const axiosInstance = useAxios();
  
  try {
    const response = await axiosInstance.delete<Cart>(`/carts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting a cart:', error);
    throw error;
  }
}