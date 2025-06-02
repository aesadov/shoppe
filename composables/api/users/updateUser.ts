import {useAxios} from '@/composables/api/axios'
import type { AxiosInstance } from 'axios'

export const useUpdateUser = async (user: User): Promise<User> => {
  const axiosInstance: AxiosInstance = useAxios();
  
  try {
    const response = await axiosInstance.put(`/users/${user.id}`, user);
    return response.data;
  } catch (error) {
    console.error('Error updating a user:', error);
    throw error;
  }
}