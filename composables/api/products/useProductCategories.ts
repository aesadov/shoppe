import { useApiFetch } from '~/composables/api/useApiFetch'

export const useGetCategories = () => {
  return useApiFetch<string[]>('/products/categories')
}
