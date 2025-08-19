import { useAxios } from '@/composables/api/axios'

export const useLogin = async (username: string, password: string) => {
  const axiosInstance = useAxios()

  try {
    const credentials = { username, password }
    const response = await axiosInstance.post<{ token: string }>('/auth/login', credentials)
    return response.data
  } catch (error) {
    console.error('Error login', error)
    throw error
  }
}
