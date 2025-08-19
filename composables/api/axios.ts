import axios from 'axios'

export const useAxios = () => {
  const config = useRuntimeConfig()
  const authToken = useCookie('authToken')

  const instance = axios.create({
    baseURL: config.public.apiBaseUrl as string,
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken.value ? `Bearer ${authToken.value}` : '',
    },
  })

  return instance
}
