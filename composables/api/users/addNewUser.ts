import {useAxios} from '@/composables/api/axios'

export const useAddNewUser = async (username: string, email: string, password: string) => {
  const axiosInstance = useAxios();
  
  try {
    const userData = {username, email, password}
    const response = await axiosInstance.post<{id: number}>('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error adding new user:', error)
    throw error
  }
}