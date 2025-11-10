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
    <MobileFilters v-if="isShowMobFilters" @close="closeMobFilters" />

    <h1 class="catalogue__title">Shop</h1>

    <div class="catalogue__main">
      <ProductFilters @btn-click="toggleShowMobFilters" />

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
</template>

<style lang="scss" scoped>
  .catalogue {
    max-width: 1200px;
    padding: 0 16px;
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

    &__filters {
      position: sticky;
      top: 100px;

      @media (max-width: $breakpoints-mobile) {
        position: static;
        display: none;
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
</style> -->

<script setup lang="ts">
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
</template>

<style lang="scss" scoped>
  .catalogue {
    max-width: 1200px;
    padding: 0 16px;
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
