<script setup lang="ts">
  import { useRoute, useRouter } from 'nuxt/app'
  import { useGetAllProducts } from '@/composables/api/products/useGetAllProducts'
  import { useNotification } from '~/composables/notification/useNotification'

  const route = useRoute()
  const router = useRouter()

  const { showError } = useNotification()
  const { data: products, pending, error, refresh } = useGetAllProducts()

  // Получаем текущую страницу из URL
  const currentPage = computed(() => {
    const page = Number(route.query.page) || 1
    return Math.max(1, page)
  })

  // Настройки пагинации
  const itemsPerPage = 6
  const totalPages = computed(() => {
    if (!products.value) return 1
    return Math.ceil(products.value.length / itemsPerPage)
  })

  // Получаем товары для текущей страницы
  const paginatedProducts = computed(() => {
    if (!products.value) return []

    const startIndex = (currentPage.value - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    return products.value.slice(startIndex, endIndex)
  })

  const handlePageChange = (page: number) => {
    router.push({
      path: route.path,
      query: { ...route.query, page },
    })
  }

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
</script>

<template>
  <MobileFilters v-show="isShowMobFilters" @icon-click="toggleShowMobFilters" />
  <div v-show="!isShowMobFilters" class="catalogue">
    <h1>Shop</h1>
    <div class="catalogue__main">
      <ProductFilters @btn-click="toggleShowMobFilters" />
      <div class="catalogue__pagination">
        <ProductList :products="paginatedProducts" :loading="pending" />
        <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          @page-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .catalogue {
    h1 {
      font-size: 32px;
      font-weight: 500;

      @media (max-width: $breakpoints-mobile) {
        margin-top: 24px;
        font-size: 20px;
        font-weight: 400;
      }
    }

    &__main {
      display: flex;
      margin-top: 39px;

      @media (max-width: $breakpoints-mobile) {
        flex-direction: column;
        margin-top: 15px;
      }
    }

    &__pagination {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
</style>
