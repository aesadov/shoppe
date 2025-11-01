<script setup lang="ts">
  import { useGetAllProducts } from '@/composables/api/products/useGetAllProducts'
  import { useNotification } from '~/composables/notification/useNotification'

  const { showError } = useNotification()
  const { data: products, pending, error, refresh } = useGetAllProducts()

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
    <div class="catalogue_main">
      <ProductFilters @btn-click="toggleShowMobFilters" />
      <ProductList :products="products" :loading="pending" />
    </div>
    <Pagination />
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

    &_main {
      display: flex;
      margin-top: 39px;

      @media (max-width: $breakpoints-mobile) {
        flex-direction: column;
        margin-top: 15px;
      }
    }
  }
</style>
