import { useRoute, useRouter } from 'nuxt/app'
import type { Ref } from 'vue'
import type { Product } from '~/types/api'

export interface PaginationOptions {
  itemsPerPage?: number
}

const DEFAULT_ITEMS_PER_PAGE = 6

export function usePagination(items: Ref<Product[] | null>, options: PaginationOptions = {}) {
  const { itemsPerPage = DEFAULT_ITEMS_PER_PAGE } = options

  const route = useRoute()
  const router = useRouter()

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

    const startIndex = (currentPage.value - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    return items.value.slice(startIndex, endIndex)
  })

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
    goToPage,
    nextPage: () => goToPage(currentPage.value + 1),
    prevPage: () => goToPage(currentPage.value - 1),
  }
}
