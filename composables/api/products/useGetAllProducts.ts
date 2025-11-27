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

// import { unref, computed } from 'vue'
// import type { MaybeRef } from 'vue'
// import { useApiFetch } from '~/composables/api/useApiFetch'
// import type { Product } from '~/types/api'

// export const useGetAllProducts = (
//   params: MaybeRef<{ limit?: number; category?: string }> = {},
//   key: MaybeRef<string> = 'products',
// ) => {
//   const paramsRef = computed(() => unref(params))
//   const keyRef = computed(() => unref(key))

//   const urlRef = computed(() =>
//     paramsRef.value.category ? `/products/category/${paramsRef.value.category}` : '/products',
//   )

//   const queryParams = computed(() => ({
//     limit: paramsRef.value.limit,
//   }))

//   return useApiFetch<Product[]>(urlRef.value, {
//     key: keyRef.value,
//     params: queryParams.value,

//     // ВАЖНО — слушаем изменения и делаем refetch
//     watch: [urlRef, keyRef, paramsRef],
//   })
// }

// import { useApiFetch } from '~/composables/api/useApiFetch'
// import type { Product } from '~/types/api'

// export const useGetAllProducts = (params: { limit?: number; category?: string } = {}) => {
//   const { category, limit } = params

//   const url = category ? `/products/category/${category}` : '/products'

//   return useApiFetch<Product[]>(url, {
//     params: {
//       limit,
//     },
//     key: `products-${category || 'all'}`, // Динамический ключ
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
