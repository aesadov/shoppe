<!-- <script setup lang="ts">
  import { useGetAllProducts } from '@/composables/api/products/useGetAllProducts'
  import { useNotification } from '~/composables/notification/useNotification'
  import { usePagination } from '~/composables/usePagination'
  import { useGetCategories } from '@/composables/api/products/useProductCategories'
  import type { FiltersState } from '~/types/filters'
  import { debounce } from '~/utils/debounce'
  import { useProductFilters } from '@/composables/useProductsFilters'
  import type { RefSymbol } from '@vue/reactivity'

  const { showError } = useNotification()
  const START_PAGE = 1

  const currentCategory = ref('')

  // Используем один экземпляр useGetAllProducts с refresh
  const {
    data: products,
    pending: productsPending,
    error: productsError,
    refresh: refreshProducts,
  } = useGetAllProducts({ category: currentCategory.value })

  // Обновляем продукты при изменении категории
  watch(currentCategory, () => {
    refreshProducts()
  })

  const { filters, updateFiltersFromQuery, updateQueryParams, getFilteredProducts } =
    useProductFilters(products)

  const filteredProducts = computed(() => getFilteredProducts())
  const { data: allCategories } = useGetCategories()

  onMounted(() => {
    updateFiltersFromQuery()
    currentCategory.value = filters.category
  })

  watch(
    () => filters.category,
    (newCategory) => {
      if (newCategory !== currentCategory.value) {
        currentCategory.value = newCategory

        if (currentPage.value !== START_PAGE) {
          handlePageChange(START_PAGE)
        }
      }
    },
  )

  watch(
    filters,
    debounce((newFilters: FiltersState) => {
      updateQueryParams(newFilters)
      if (currentPage.value !== START_PAGE) {
        handlePageChange(START_PAGE)
      }
    }, 300),
    { deep: true },
  )

  watch(productsError, (newError) => {
    if (newError) {
      showError('Error loading products')
    }
  })

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    goToPage: handlePageChange,
  } = usePagination(filteredProducts, {
    itemsPerPage: 6,
  })

  const isShowMobFilters = ref(false)

  const toggleShowMobFilters = () => {
    isShowMobFilters.value = !isShowMobFilters.value
  }

  const handleFiltersChange = (newFilters: FiltersState) => {
    Object.assign(filters, newFilters)
  }
</script> -->

<!-- <script setup lang="ts">
  import { useGetAllProducts } from '@/composables/api/products/useGetAllProducts'
  import { useNotification } from '~/composables/notification/useNotification'
  import { usePagination } from '~/composables/usePagination'
  import { useGetCategories } from '@/composables/api/products/useProductCategories'
  import type { FiltersState } from '~/types/filters'
  import { debounce } from '~/utils/debounce'
  import { useProductFilters } from '@/composables/useProductsFilters'

  const { showError } = useNotification()
  const START_PAGE = 1

  const currentCategory = ref('')

  const productsParams = computed(() => ({
    category: currentCategory.value,
  }))

  const {
    data: products,
    pending: productsPending,
    error: productsError,
    refresh: refreshProducts,
  } = useGetAllProducts(productsParams.value) 

  watch(
    productsParams,
    () => {
      console.log('🔄 Category changed to:', currentCategory.value)
      refreshProducts()
    },
    { deep: true },
  )

  const { filters, updateFiltersFromQuery, updateQueryParams, getFilteredProducts } =
    useProductFilters(products)

  const filteredProducts = computed(() => getFilteredProducts())
  const { data: allCategories } = useGetCategories()

  onMounted(() => {
    updateFiltersFromQuery()
    currentCategory.value = filters.category
  })

  watch(
    () => filters.category,
    (newCategory) => {
      if (newCategory !== currentCategory.value) {
        currentCategory.value = newCategory

        if (currentPage.value !== START_PAGE) {
          handlePageChange(START_PAGE)
        }
      }
    },
  )

  watch(
    filters,
    debounce((newFilters: FiltersState) => {
      updateQueryParams(newFilters)
      if (currentPage.value !== START_PAGE) {
        handlePageChange(START_PAGE)
      }
    }, 300),
    { deep: true },
  )

  watch(productsError, (newError) => {
    if (newError) {
      showError('Error loading products')
    }
  })

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    goToPage: handlePageChange,
  } = usePagination(filteredProducts, {
    itemsPerPage: 6,
  })

  const isShowMobFilters = ref(false)

  const toggleShowMobFilters = () => {
    isShowMobFilters.value = !isShowMobFilters.value
  }

  const handleFiltersChange = (newFilters: FiltersState) => {
    Object.assign(filters, newFilters)
  }
</script> -->

<script setup lang="ts">
  import { useGetAllProducts } from '@/composables/api/products/useGetAllProducts'
  import { useNotification } from '~/composables/notification/useNotification'
  import { usePagination } from '~/composables/usePagination'
  import { useGetCategories } from '@/composables/api/products/useProductCategories'
  import type { FiltersState } from '~/types/filters'
  import { debounce } from '~/utils/debounce'
  import { useProductFilters } from '@/composables/useProductsFilters'

  const { showError } = useNotification()
  const START_PAGE = 1

  const currentCategory = ref('')

  const productsResult = computed(() => {
    return useGetAllProducts({ category: currentCategory.value })
  })

  const products = computed(() => productsResult.value.data?.value)
  const productsPending = computed(() => productsResult.value.pending.value)
  const productsError = computed(() => productsResult.value.error.value)

  const { filters, updateFiltersFromQuery, updateQueryParams, getFilteredProducts } =
    useProductFilters(products)

  const filteredProducts = computed(() => getFilteredProducts())
  const { data: allCategories } = useGetCategories()

  onMounted(() => {
    updateFiltersFromQuery()
    currentCategory.value = filters.category
  })

  watch(
    () => filters.category,
    (newCategory) => {
      if (newCategory !== currentCategory.value) {
        currentCategory.value = newCategory

        if (currentPage.value !== START_PAGE) {
          handlePageChange(START_PAGE)
        }
      }
    },
  )

  watch(
    filters,
    debounce((newFilters: FiltersState) => {
      updateQueryParams(newFilters)
      if (currentPage.value !== START_PAGE) {
        handlePageChange(START_PAGE)
      }
    }, 300),
    { deep: true },
  )

  watch(productsError, (newError) => {
    if (newError) {
      showError('Error loading products')
    }
  })

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    goToPage: handlePageChange,
  } = usePagination(filteredProducts, {
    itemsPerPage: 6,
  })

  const isShowMobFilters = ref(false)

  const toggleShowMobFilters = () => {
    isShowMobFilters.value = !isShowMobFilters.value
  }

  const handleFiltersChange = (newFilters: FiltersState) => {
    Object.assign(filters, newFilters)
  }
</script>

<template>
  <div class="catalogue">
    <h1 class="catalogue__title">Shop</h1>

    <div class="catalogue__main">
      <Filters
        :filters="filters"
        :categories="allCategories || []"
        :is-mobile-panel-open="isShowMobFilters"
        @filters-change="handleFiltersChange"
        @toggle="toggleShowMobFilters"
      />

      <main class="catalogue__content">
        <div class="catalogue__products">
          <ProductList :products="paginatedProducts" :loading="productsPending" />
        </div>

        <div v-if="totalPages > START_PAGE" class="catalogue__pagination">
          <Pagination
            :current-page="currentPage"
            :total-pages="totalPages"
            @page-change="handlePageChange"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .catalogue {
    max-width: 1200px;
    margin: 0 auto;

    &__title {
      margin: 0 0 32px;
      font-size: 32px;
      font-weight: 500;
      color: $main-text-color;

      @media (max-width: $breakpoints-mobile) {
        margin-top: 24px;
        margin-bottom: 16px;
        font-size: 20px;
        font-weight: 400;
      }
    }

    &__main {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 40px;
      align-items: start;

      @media (max-width: $breakpoints-mobile) {
        grid-template-columns: 1fr;
        gap: 20px;
        margin-top: 15px;
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      min-height: 500px;
    }

    &__products {
      flex: 1;
      margin-bottom: 40px;
    }

    &__pagination {
      display: flex;
      justify-content: center;
      padding-top: 20px;
      margin-top: auto;
      border-top: 1px solid $divider-color;
    }
  }

  @media (max-width: $breakpoints-mobile) {
    .catalogue {
      padding: 0 8px;

      &__products {
        margin-bottom: 24px;
      }

      &__pagination {
        padding-top: 16px;
      }
    }
  }
</style>
