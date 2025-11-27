<!-- <script setup lang="ts">
  import { useGetAllProducts } from '@/composables/api/products/useGetAllProducts'
  import { useNotification } from '~/composables/notification/useNotification'
  import { usePagination } from '~/composables/usePagination'

  import { useGetCategories } from '~/composables/filters/useProductCategories'
  import type { FiltersState } from '~/types/filters'
  import { debounce } from '~/utils/debounce'
  import { useProductFilters } from '~/composables/filters/useProductsFilters'

  const { showError } = useNotification()

  const category = ref('')

  const {
    data: products,
    pending: productsPending,
    error: productsError,
    refresh: refreshProducts,
  } = useGetAllProducts({ category: category.value })

  watch(
    category,
    () => {
      refreshProducts()
    },
    { immediate: true },
  )

  const { filters, updateFiltersFromQuery, updateQueryParams, getFilteredProducts } =
    useProductFilters(products)

  watch(
    () => filters.category,
    (newCategory) => {
      category.value = newCategory
    },
    { immediate: true },
  )

  const filteredProducts = computed(() => getFilteredProducts())
  const { data: allCategories } = useGetCategories()

  onMounted(() => {
    updateFiltersFromQuery()
  })

  watch(
    () => filters.category,
    (newCategory, oldCategory) => {
      if (newCategory !== oldCategory) {
        refreshProducts()
        if (currentPage.value !== 1) {
          handlePageChange(1)
        }
      }
    },
  )

  watch(
    filters,
    debounce((newFilters: FiltersState) => {
      updateQueryParams(newFilters)
    }, 300),
    { deep: true },
  )

  watch(productsError, (newError) => {
    if (newError) {
      console.error('Error loading products:', newError)
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

  watch(
    filters,
    () => {
      if (currentPage.value !== 1) {
        handlePageChange(1)
      }
    },
    { deep: true },
  )
</script> -->

<!-- <script setup lang="ts">
  import { useGetAllProducts } from '@/composables/api/products/useGetAllProducts'
  import { useNotification } from '~/composables/notification/useNotification'
  import { usePagination } from '~/composables/usePagination'
  import { useGetCategories } from '~/composables/filters/useProductCategories'
  import type { FiltersState } from '~/types/filters'
  import { debounce } from '~/utils/debounce'
  import { useProductFilters } from '~/composables/filters/useProductsFilters'

  const { showError } = useNotification()

  // catalogue component
  const currentCategory = ref('')

  const {
    data: products,
    pending: productsPending,
    error: productsError,
    refresh: refreshProducts,
  } = useGetAllProducts({ category: currentCategory.value })

  // Добавьте этот watch - он должен срабатывать при изменении категории
  watch(currentCategory, (newCategory, oldCategory) => {
    console.log('🎯 currentCategory изменилась:', { было: oldCategory, стало: newCategory })
    console.log('🔄 Вызываем refreshProducts')
    refreshProducts()
  })

  const { filters, updateFiltersFromQuery, updateQueryParams, getFilteredProducts } =
    useProductFilters(products)

  // И убедитесь, что этот watch тоже есть
  watch(
    () => filters.category,
    (newCategory) => {
      console.log('📁 filters.category изменилась:', newCategory)
      if (newCategory !== currentCategory.value) {
        currentCategory.value = newCategory
        // refreshProducts вызовется в watch выше
      }
    },
  )

  const filteredProducts = computed(() => getFilteredProducts())
  const { data: allCategories } = useGetCategories()

  onMounted(() => {
    updateFiltersFromQuery()
    // Устанавливаем начальную категорию из фильтров
    currentCategory.value = filters.category
  })

  // При изменении категории в фильтрах обновляем запрос
  watch(
    () => filters.category,
    (newCategory) => {
      if (newCategory !== currentCategory.value) {
        currentCategory.value = newCategory
        refreshProducts()
        if (currentPage.value !== 1) {
          handlePageChange(1)
        }
      }
    },
  )

  watch(
    filters,
    debounce((newFilters: FiltersState) => {
      updateQueryParams(newFilters)
    }, 300),
    { deep: true },
  )

  watch(productsError, (newError) => {
    if (newError) {
      console.error('Error loading products:', newError)
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

  watch(
    filters,
    () => {
      if (currentPage.value !== 1) {
        handlePageChange(1)
      }
    },
    { deep: true },
  )
</script> -->

<!-- <script setup lang="ts">
  import { useGetAllProducts } from '@/composables/api/products/useGetAllProducts'
  import { useNotification } from '~/composables/notification/useNotification'
  import { usePagination } from '~/composables/usePagination'
  import { useGetCategories } from '~/composables/filters/useProductCategories'
  import type { FiltersState } from '~/types/filters'
  import { debounce } from '~/utils/debounce'
  import { useProductFilters } from '~/composables/filters/useProductsFilters'
  import { nextTick } from 'vue'

  const { showError } = useNotification()

  // Убираем отдельную переменную для категории, используем ключ для принудительного обновления
  const categoryKey = ref('')

  const {
    data: products,
    pending: productsPending,
    error: productsError,
    refresh: refreshProducts,
  } = useGetAllProducts({ category: categoryKey.value })

  const { filters, updateFiltersFromQuery, updateQueryParams, getFilteredProducts } =
    useProductFilters(products)

  const filteredProducts = computed(() => getFilteredProducts())
  const { data: allCategories } = useGetCategories()

  onMounted(() => {
    updateFiltersFromQuery()
    // Устанавливаем начальную категорию из URL
    categoryKey.value = filters.category
  })

  // При изменении категории в фильтрах обновляем ключ и перезагружаем продукты
  watch(
    () => filters.category,
    (newCategory) => {
      if (newCategory !== categoryKey.value) {
        categoryKey.value = newCategory
        // Используем nextTick чтобы убедиться, что categoryKey обновился
        nextTick(() => {
          refreshProducts()
        })

        if (currentPage.value !== 1) {
          handlePageChange(1)
        }
      }
    },
  )

  watch(
    filters,
    debounce((newFilters: FiltersState) => {
      updateQueryParams(newFilters)
    }, 300),
    { deep: true },
  )

  watch(productsError, (newError) => {
    if (newError) {
      console.error('Error loading products:', newError)
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

  watch(
    filters,
    () => {
      if (currentPage.value !== 1) {
        handlePageChange(1)
      }
    },
    { deep: true },
  )
</script> -->

<!-- <script setup lang="ts">
  import { useGetAllProducts } from '@/composables/api/products/useGetAllProducts'
  import { useNotification } from '~/composables/notification/useNotification'
  import { usePagination } from '~/composables/usePagination'
  import { useGetCategories } from '~/composables/filters/useProductCategories'
  import type { FiltersState } from '~/types/filters'
  import { debounce } from '~/utils/debounce'
  import { useProductFilters } from '~/composables/filters/useProductsFilters'

  const { showError } = useNotification()

  // Реактивная категория
  const currentCategory = ref('')

  // Пересоздаем products при изменении категории
  const productsResult = computed(() => {
    console.log('Recreating products composable with category:', currentCategory.value)
    return useGetAllProducts({ category: currentCategory.value })
  })

  const products = computed(() => productsResult.value.data)
  const productsPending = computed(() => productsResult.value.pending)
  const productsError = computed(() => productsResult.value.error)

  const { filters, updateFiltersFromQuery, updateQueryParams, getFilteredProducts } =
    useProductFilters(products)

  const filteredProducts = computed(() => getFilteredProducts())
  const { data: allCategories } = useGetCategories()

  onMounted(() => {
    updateFiltersFromQuery()
    currentCategory.value = filters.category
  })

  // При изменении категории в фильтрах
  watch(
    () => filters.category,
    (newCategory) => {
      console.log('Category changed in filters:', newCategory)
      if (newCategory !== currentCategory.value) {
        currentCategory.value = newCategory

        if (currentPage.value !== 1) {
          handlePageChange(1)
        }
      }
    },
  )

  watch(
    filters,
    debounce((newFilters: FiltersState) => {
      updateQueryParams(newFilters)
    }, 300),
    { deep: true },
  )

  watch(productsError, (newError) => {
    if (newError) {
      console.error('Error loading products:', newError)
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

  watch(
    filters,
    () => {
      if (currentPage.value !== 1) {
        handlePageChange(1)
      }
    },
    { deep: true },
  )
</script> -->

<!-- <script setup lang="ts">
  import { ref, computed, watch, onMounted } from 'vue'
  import { useGetAllProducts } from '@/composables/api/products/useGetAllProducts'
  import { useNotification } from '~/composables/notification/useNotification'
  import { usePagination } from '~/composables/usePagination'
  import { useGetCategories } from '~/composables/filters/useProductCategories'
  import type { FiltersState } from '~/types/filters'
  import { debounce } from '~/utils/debounce'
  import { useProductFilters } from '~/composables/filters/useProductsFilters'

  const { showError } = useNotification()

  const currentCategory = ref('')

  // Добавляем ключ для предотвращения предупреждения
  const productsKey = ref(0)

  const productsResult = computed(() => {
    return useGetAllProducts(
      {
        category: currentCategory.value,
      },
      `products-${productsKey.value}-${currentCategory.value}`,
    )
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
        // Обновляем ключ при смене категории
        productsKey.value++

        if (currentPage.value !== 1) {
          handlePageChange(1)
        }
      }
    },
  )

  watch(
    filters,
    debounce((newFilters: FiltersState) => {
      updateQueryParams(newFilters)
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

  watch(
    filters,
    () => {
      if (currentPage.value !== 1) {
        handlePageChange(1)
      }
    },
    { deep: true },
  )
</script> -->

<!-- <script setup lang="ts">
  import { ref, computed, watch, onMounted } from 'vue'
  import { useGetAllProducts } from '@/composables/api/products/useGetAllProducts'
  import { useNotification } from '~/composables/notification/useNotification'
  import { usePagination } from '~/composables/usePagination'
  import { useGetCategories } from '~/composables/filters/useProductCategories'
  import { useProductFilters } from '~/composables/filters/useProductsFilters'
  import { debounce } from '~/utils/debounce'
  import type { FiltersState } from '~/types/filters'

  const { showError } = useNotification()

  // ---------- ФИЛЬТРЫ ----------
  const { filters, updateFiltersFromQuery, updateQueryParams, getFilteredProducts } =
    useProductFilters()

  onMounted(() => {
    updateFiltersFromQuery()
  })

  // ---------- РЕАКТИВНЫЕ ПАРАМЕТРЫ ДЛЯ API ----------
  const productsParams = computed(() => ({
    category: filters.category || '',
  }))

  const productsKey = computed(() => `products-${filters.category || 'all'}`)

  // ---------- API ЗАПРОС ----------
  const {
    data: products,
    pending: productsPending,
    error: productsError,
  } = useGetAllProducts(productsParams, productsKey)

  // ---------- ФИЛЬТРАЦИЯ НА КЛИЕНТЕ ----------
  const filteredProducts = computed(() => getFilteredProducts(products.value || []))

  // ---------- ПАГИНАЦИЯ ----------
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    goToPage: handlePageChange,
  } = usePagination(filteredProducts, { itemsPerPage: 6 })

  // ---------- СЛЕЖЕНИЕ ЗА ФИЛЬТРАМИ ----------
  watch(
    filters,
    debounce((newFilters: FiltersState) => {
      updateQueryParams(newFilters)
    }, 300),
    { deep: true },
  )

  // При изменении фильтров → сбрасываем страницу
  watch(
    filters,
    () => {
      if (currentPage.value !== 1) {
        handlePageChange(1)
      }
    },
    { deep: true },
  )

  // ---------- ОШИБКИ ----------
  watch(productsError, (err) => {
    if (err) showError('Error loading products')
  })

  // ---------- КАТЕГОРИИ ----------
  const { data: allCategories } = useGetCategories()

  // ---------- МОБИЛЬНЫЕ ФИЛЬТРЫ ----------
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

        if (currentPage.value !== 1) {
          handlePageChange(1)
        }
      }
    },
  )

  watch(
    filters,
    debounce((newFilters: FiltersState) => {
      updateQueryParams(newFilters)
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

  watch(
    filters,
    () => {
      if (currentPage.value !== 1) {
        handlePageChange(1)
      }
    },
    { deep: true },
  )
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

        <div v-if="totalPages > 1" class="catalogue__pagination">
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
