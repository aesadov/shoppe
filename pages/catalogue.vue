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
</script>

<template>
  <div class="catalogue">
    <h1>Shop</h1>
    <div class="catalogue_main">
      <ProductFilters />
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
    }

    &_main {
      display: flex;
      margin-top: 39px;
    }
  }
</style>
