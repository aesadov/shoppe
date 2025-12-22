import { $fetch } from 'ofetch'
import type { FetchOptions } from 'ofetch'

export const useFetchApi = () => {
  const config = useRuntimeConfig()

  const fetchApi = async <T>(
    endpoint: string,
    options: FetchOptions<'json'> = {},
  ): Promise<T | null> => {
    try {
      return await $fetch<T>(endpoint, {
        baseURL: config.public.apiBaseUrl,
        ...options,
      })
    } catch (error) {
      console.error('API request error:', error)
      return null
    }
  }

  return {
    fetchApi,
  }
}
