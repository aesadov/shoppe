<script setup lang="ts">
  import { useGetAllProducts } from '@/composables/api/products/useGetAllProducts'
  import { useNotification } from '~/composables/notification/useNotification'

  const { showError } = useNotification()

  const PRODUCTS_LIMIT = 6

  const { data: products, pending, error } = useGetAllProducts({ limit: PRODUCTS_LIMIT })

  watch(error, (newError) => {
    if (newError) {
      console.error('Error loading products:', newError)
      showError('Error loading products')
    }
  })
</script>

<template>
  <div>
    <HomeSlider />
    <ProductsList :type="'latest'" :products="products" :pending="pending" />
  </div>
</template>
