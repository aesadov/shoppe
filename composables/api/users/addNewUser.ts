import {useAxios} from '@/composables/api/axios'
import type { AxiosInstance } from 'axios'

export const useAddNewUser = async (username: string, email: string, password: string) => {
  const axiosInstance: AxiosInstance = useAxios();
  
  try {
    const userData = {username, email, password}
    const response = await axiosInstance.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error adding new user:', error)
    throw error
  }
}