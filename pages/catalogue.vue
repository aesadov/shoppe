<!-- <script setup lang="ts">

  import { useGetAllProducts } from '@/composables/api/products/useGetAllProducts'
  import { useNotification } from '~/composables/notification/useNotification'
  import { usePagination } from '~/composables/usePagination'

  const { showError } = useNotification()
  const { data: products, pending, error } = useGetAllProducts()

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    goToPage: handlePageChange,
  } = usePagination(products, {
    itemsPerPage: 6,
  })

  watch(error, (newError) => {
    if (newError) {
      console.error('Error loading products:', newError)
      showError('Error loading products')
    }
  })

  const isShowMobFilters = ref(false)

  const toggleShowMobFilters = () => {
    isShowMobFilters.value = !isShowMobFilters.value
  }

  const closeMobFilters = () => {
    isShowMobFilters.value = false
  }
</script>

<template>
  <div class="catalogue">
    <h1 class="catalogue__title">Shop</h1>

    <div class="catalogue__main">
      <Filters
        :is-mobile-panel-open="isShowMobFilters"
        @toggle="toggleShowMobFilters"
        @close="closeMobFilters"
      />

      <main class="catalogue__content">
        <div class="catalogue__products">
          <ProductList :products="paginatedProducts" :loading="pending" />
        </div>

        <div class="catalogue__pagination">
          <Pagination
            :current-page="currentPage"
            :total-pages="totalPages"
            @page-change="handlePageChange"
          />
        </div>
      </main>
    </div>
  </div>
</template> -->

<script setup lang="ts">
  import { useGetAllProducts } from '@/composables/api/products/useGetAllProducts'
  import { useNotification } from '~/composables/notification/useNotification'
  import { usePagination } from '~/composables/usePagination'
  import { debounce } from '~/utils/debounce'
  import { useRoute, useRouter } from 'nuxt/app'

  const { showError } = useNotification()
  const route = useRoute()
  const router = useRouter()

  export interface FiltersState {
    search: string
    category: string
    sortBy: string
    minPrice: number
    maxPrice: number
    onSale: boolean
    inStock: boolean
  }

  // Состояние фильтров с явным типом
  const filters = reactive<FiltersState>({
    search: '',
    category: '',
    sortBy: '',
    minPrice: 0,
    maxPrice: 500,
    onSale: false,
    inStock: false,
  })

  // Загрузка всех продуктов через ваш useGetAllProducts
  const {
    data: allProducts,
    pending: allProductsPending,
    error: allProductsError,
  } = useGetAllProducts()

  // Загрузка категорий из продуктов
  const categories = computed(() => {
    if (!allProducts.value) return []

    const uniqueCategories = [...new Set(allProducts.value.map((product) => product.category))]
    return uniqueCategories.map((category) => ({
      value: category,
      label: category.charAt(0).toUpperCase() + category.slice(1).replace(/'/g, "'"),
    }))
  })

  // Чтение query параметров при загрузке
  onMounted(() => {
    updateFiltersFromQuery()
  })

  // Синхронизация фильтров с URL - явно указываем тип
  watch(
    filters,
    debounce((newFilters: FiltersState) => {
      updateQueryParams(newFilters)
    }, 300),
    { deep: true },
  )

  // Обработка ошибок
  watch(allProductsError, (newError) => {
    if (newError) {
      console.error('Error loading products:', newError)
      showError('Error loading products')
    }
  })

  // Обновление фильтров из query параметров
  const updateFiltersFromQuery = () => {
    const query = route.query

    if (query.search) filters.search = String(query.search)
    if (query.category) filters.category = String(query.category)
    if (query.sortBy) filters.sortBy = String(query.sortBy)
    if (query.minPrice) filters.minPrice = Number(query.minPrice)
    if (query.maxPrice) filters.maxPrice = Number(query.maxPrice)
    if (query.onSale) filters.onSale = query.onSale === 'true'
    if (query.inStock) filters.inStock = query.inStock === 'true'
  }

  // Обновление query параметров
  const updateQueryParams = (newFilters: FiltersState) => {
    const query: Record<string, string> = {}

    if (newFilters.search) query.search = newFilters.search
    if (newFilters.category) query.category = newFilters.category
    if (newFilters.sortBy) query.sortBy = newFilters.sortBy
    if (newFilters.minPrice > 0) query.minPrice = newFilters.minPrice.toString()
    if (newFilters.maxPrice < 500) query.maxPrice = newFilters.maxPrice.toString()
    if (newFilters.onSale) query.onSale = newFilters.onSale.toString()
    if (newFilters.inStock) query.inStock = newFilters.inStock.toString()

    router.replace({ query })
  }

  // Фильтрация и сортировка продуктов
  const filteredProducts = computed(() => {
    if (!allProducts.value) return []

    let filtered = [...allProducts.value]

    // Фильтр по категории
    if (filters.category) {
      filtered = filtered.filter((product) => product.category === filters.category)
    }

    // Фильтр по поиску
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower),
      )
    }

    // Фильтр по цене
    filtered = filtered.filter(
      (product) => product.price >= filters.minPrice && product.price <= filters.maxPrice,
    )

    // Фильтр по наличию
    if (filters.inStock) {
      filtered = filtered.filter((product) => product.rating?.count && product.rating.count > 0)
    }

    // Фильтр по распродаже
    if (filters.onSale) {
      // Товары со скидкой (цена меньше 50)
      filtered = filtered.filter((product) => product.price < 50)
    }

    // Сортировка
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-asc':
          filtered.sort((a, b) => a.price - b.price)
          break
        case 'price-desc':
          filtered.sort((a, b) => b.price - a.price)
          break
        case 'name-asc':
          filtered.sort((a, b) => a.title.localeCompare(b.title))
          break
        case 'name-desc':
          filtered.sort((a, b) => b.title.localeCompare(a.title))
          break
        case 'newest':
          filtered.sort((a, b) => b.id - a.id)
          break
        case 'rating-desc':
          filtered.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
          break
      }
    }

    return filtered
  })

  // Пагинация
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    goToPage: handlePageChange,
  } = usePagination(filteredProducts, {
    itemsPerPage: 6,
  })

  // Мобильные фильтры
  const isShowMobFilters = ref(false)

  const toggleShowMobFilters = () => {
    isShowMobFilters.value = !isShowMobFilters.value
  }

  const closeMobFilters = () => {
    isShowMobFilters.value = false
  }

  // Обработчик изменения фильтров
  const handleFiltersChange = (newFilters: FiltersState) => {
    Object.assign(filters, newFilters)
  }

  // Сброс текущей страницы при изменении фильтров
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
        :categories="categories"
        :is-mobile-panel-open="isShowMobFilters"
        @filters-change="handleFiltersChange"
        @toggle="toggleShowMobFilters"
        @close="closeMobFilters"
      />

      <main class="catalogue__content">
        <div class="catalogue__products">
          <ProductList :products="paginatedProducts" :loading="allProductsPending" />
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

    // padding: 0 16px;
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
