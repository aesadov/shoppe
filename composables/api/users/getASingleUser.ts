import { useAxios } from '@/composables/api/axios'

export const useGetASingleUser = async (id: number) => {
  const axiosInstance = useAxios()

  try {
    const response = await axiosInstance.get<User>(`/users/${id}`)
    return response.data
  } catch (error) {
    console.error('Error getting a single user:', error)
    throw error
  }
}
