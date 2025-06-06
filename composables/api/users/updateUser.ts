import {useAxios} from '@/composables/api/axios'

export const useUpdateUser = async (user: User) => {
  const axiosInstance = useAxios();
  
  try {
    const response = await axiosInstance.put<User>(`/users/${user.id}`, user);
    return response.data;
  } catch (error) {
    console.error('Error updating a user:', error);
    throw error;
  }
}