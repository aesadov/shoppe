// import { useApiFetch } from '~/composables/api/useApiFetch'
// import type { Product } from '~/types/api'

// export const useGetAllProducts = (options: { limit?: number } = {}) => {
//   const { limit } = options

//   return useApiFetch<Product[]>('/products', {
//     params: {
//       limit,
//     },
//   })
// }

// import { useApiFetch } from '~/composables/api/useApiFetch'
// import type { Product } from '~/types/api'

// export const useGetAllProducts = (params: { limit?: number; category?: string } = {}) => {
//   const { category, limit } = params

//   const url = category ? `/products/category/${category}` : '/products'
//   console.log('Fetching products from:', url, 'with category:', category)
//   return useApiFetch<Product[]>(url, {
//     params: {
//       limit,
//     },
//   })
// }

// import { useApiFetch } from '~/composables/api/useApiFetch'
// import type { Product } from '~/types/api'

// export const useGetAllProducts = (
//   params: { limit?: number; category?: string } = {},
//   key?: string,
// ) => {
//   const { category, limit } = params
//   const url = category ? `/products/category/${category}` : '/products'

//   return useApiFetch<Product[]>(url, {
//     key: key || 'products', // Добавляем поддержку ключа
//     params: {
//       limit,
//     },
//   })
// }

// import { useApiFetch } from '~/composables/api/useApiFetch'
// import type { Product } from '~/types/api'
// import type { Ref } from 'vue'

// export const useGetAllProducts = (params: Ref<{ limit?: number; category?: string }>) => {
//   // Используем computed для реактивного URL и ключа
//   const url = computed(() => {
//     const category = params.value.category
//     return category ? `/products/category/${category}` : '/products'
//   })

//   const key = computed(() => {
//     return `products-${params.value.category || 'all'}-${params.value.limit || 'default'}`
//   })

//   return useApiFetch<Product[]>(url.value, {
//     key: key.value,
//     params: {
//       limit: params.value.limit,
//     },
//   })
// }

import { useApiFetch } from '~/composables/api/useApiFetch'
import type { Product } from '~/types/api'
export const useGetAllProducts = (params: { limit?: number; category?: string } = {}) => {
  const { category, limit } = params
  const url = category ? `/products/category/${category}` : '/products'
  return useApiFetch<Product[]>(url, {
    params: {
      limit,
    },
  })
}
