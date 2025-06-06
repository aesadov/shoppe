import {useAxios} from '@/composables/api/axios'

export const useGetAllUsers = async () => {
  const axiosInstance = useAxios();
  
  try {
    const response = await axiosInstance.get<User[]>('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}