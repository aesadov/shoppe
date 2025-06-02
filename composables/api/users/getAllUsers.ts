import {useAxios} from '@/composables/api/axios'
import type { AxiosInstance } from 'axios';

export const useGetAllUsers = async (): Promise<User[]> => {
  const axiosInstance: AxiosInstance = useAxios();
  
  try {
    const response = await axiosInstance.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}