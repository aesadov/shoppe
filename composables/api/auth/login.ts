import {useAxios} from '@/composables/api/axios'
import type { AxiosInstance } from 'axios'

export const useLogin = async (username: string, password: string): Promise<{token: string}> => {
  const axiosInstance: AxiosInstance = useAxios();
  
  try {
    const credentials = {username, password}
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error login', error);
    throw error;
  }
}