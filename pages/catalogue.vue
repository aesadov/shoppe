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
</style> -->

<script setup lang="ts">
  import { useGetAllProducts } from '@/composables/api/products/useGetAllProducts'
  import { useNotification } from '~/composables/notification/useNotification'
  import { usePagination } from '~/composables/usePagination'
  import { useBreakpoints } from '@vueuse/core'

  const { showError } = useNotification()
  const { data: products, pending, error } = useGetAllProducts()

  const breakpoints = useBreakpoints({
    mobile: 768,
  })

  const isMobile = breakpoints.smaller('mobile')

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    goToPage: handlePageChange,
  } = usePagination(products, {
    itemsPerPage: 6,
  })

  const displayProducts = computed(() => {
    return isMobile.value ? products.value : paginatedProducts.value
  })

  const showPagination = computed(() => !isMobile.value)

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
        <ProductList :products="displayProducts" :loading="pending" />
        <Pagination
          v-if="showPagination"
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
