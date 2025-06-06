import {useAxios} from '@/composables/api/axios'

export const useDeleteAUser = async (id: number) => {
  const axiosInstance = useAxios();
  
  try {
    const response = await axiosInstance.delete<User>(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting a user:', error);
    throw error;
  }
}