import {useAxios} from '@/composables/api/axios'
import type { AxiosInstance } from 'axios'

export const useGetASingleUser = async (id: number): Promise<User> => {
  const axiosInstance: AxiosInstance = useAxios();
  
  try {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting a single user:', error);
    throw error;
  }
}