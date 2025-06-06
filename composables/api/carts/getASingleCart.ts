import {useAxios} from '@/composables/api/axios'

export const useGetASingleCart = async (id: number) => {
  const axiosInstance = useAxios();
  
  try {
    const response = await axiosInstance.get<Cart>(`/carts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting a single cart:', error);
    throw error;
  }
}