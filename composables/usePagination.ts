// import { useRoute, useRouter } from 'nuxt/app'
// import { useWindowSize } from '@vueuse/core'
// import type { Ref } from 'vue'
// import type { Product } from '~/types/api'

// export interface PaginationOptions {
//   itemsPerPage?: number
// }

// const DEFAULT_ITEMS_PER_PAGE = 6
// const MOBILE_BREAKPOINT = 768

// export function usePagination(items: Ref<Product[] | null>, options: PaginationOptions = {}) {
//   const { itemsPerPage = DEFAULT_ITEMS_PER_PAGE } = options

//   const route = useRoute()
//   const router = useRouter()
//   const { width: windowWidth } = useWindowSize()

//   // Текущая страница из URL
//   const currentPage = computed(() => {
//     const page = Number(route.query.page) || 1
//     return Math.max(1, page)
//   })

//   // Общее количество страниц
//   const totalPages = computed(() => {
//     if (!items.value) return 1
//     return Math.ceil(items.value.length / itemsPerPage)
//   })

//   const isMobile = computed(() => windowWidth.value <= MOBILE_BREAKPOINT)

//   const paginatedItems = computed(() => {
//     if (!items.value) return []

//     // На мобильных показываем все товары
//     if (isMobile.value) {
//       return items.value
//     }

//     // На десктопе - пагинация
//     const startIndex = (currentPage.value - 1) * itemsPerPage
//     const endIndex = startIndex + itemsPerPage

//     return items.value.slice(startIndex, endIndex)
//   })

//   const showPagination = computed(() => !isMobile.value)

//   const goToPage = (page: number) => {
//     if (page >= 1 && page <= totalPages.value) {
//       router.push({
//         path: route.path,
//         query: { ...route.query, page },
//       })
//     }
//   }

//   const nextPage = () => {
//     goToPage(currentPage.value + 1)
//   }

//   const prevPage = () => {
//     goToPage(currentPage.value - 1)
//   }

//   return {
//     currentPage,
//     totalPages,
//     paginatedItems,
//     showPagination,
//     isMobile,
//     goToPage,
//     nextPage,
//     prevPage,
//   }
// }

import { useRoute, useRouter } from 'nuxt/app'
import type { Ref } from 'vue'
import type { Product } from '~/types/api'
import { useMobile } from '~/composables/useMobile'

export interface PaginationOptions {
  itemsPerPage?: number
}

const DEFAULT_ITEMS_PER_PAGE = 6

export function usePagination(items: Ref<Product[] | null>, options: PaginationOptions = {}) {
  const { itemsPerPage = DEFAULT_ITEMS_PER_PAGE } = options

  const route = useRoute()
  const router = useRouter()
  const { isMobile } = useMobile()

  const currentPage = computed(() => {
    const page = Number(route.query.page) || 1
    return Math.max(1, page)
  })

  const totalPages = computed(() => {
    if (!items.value) return 1
    return Math.ceil(items.value.length / itemsPerPage)
  })

  const paginatedItems = computed(() => {
    if (!items.value) return []

    // На мобильных показываем все товары (только на клиенте)
    if (isMobile.value && process.client) {
      return items.value
    }

    // На десктопе и SSR - пагинация
    const startIndex = (currentPage.value - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    return items.value.slice(startIndex, endIndex)
  })

  const showPagination = computed(() => !isMobile.value)

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      router.push({
        path: route.path,
        query: { ...route.query, page },
      })
    }
  }

  return {
    currentPage,
    totalPages,
    paginatedItems,
    showPagination,
    isMobile,
    goToPage,
    nextPage: () => goToPage(currentPage.value + 1),
    prevPage: () => goToPage(currentPage.value - 1),
  }
}
