<script setup lang="ts">
  import ProductCard from '~/components/latestProducts/ProductCard.vue'
  import { useGetAllProducts } from '@/composables/api/products/useGetAllProducts'
  import { useNotification } from '~/composables/notification/useNotification'

  const { showError } = useNotification()

  const PRODUCTS_LIMIT = 6

  const { data: products, pending, error, refresh } = useGetAllProducts({ limit: PRODUCTS_LIMIT })

  watch(error, (newError) => {
    if (newError) {
      console.error('Error loading products:', newError)
      showError('Error loading products')
    }
  })
</script>

<template>
  <div class="latest">
    <div class="latest__header">
      <h2 class="latest__title">Shop The Latest</h2>
      <NuxtLink to="" class="latest__link">View All</NuxtLink>
    </div>
    <div class="latest__products">
      <!-- Скелетоны -->
      <ProductCard v-for="n of 6" v-show="pending" :key="'skeleton-' + n" :loading="true" />

      <!-- Реальные продукты -->
      <ProductCard
        v-for="product in products"
        v-show="!pending"
        :key="product.id"
        :product="product"
        :loading="false"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .latest {
    position: relative;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 39px;

      @media (max-width: $breakpoints-mobile) {
        margin-bottom: 13px;
      }
    }

    &__title {
      font-size: 33px;
      font-weight: 500;

      @media (max-width: $breakpoints-mobile) {
        font-size: 16px;
        font-weight: 400;
      }
    }

    &__link {
      font-size: 20px;
      font-weight: 500;
      color: $accent-color;
      cursor: pointer;

      @media (max-width: $breakpoints-mobile) {
        font-size: 14px;
        font-weight: 400;
      }
    }

    &__products {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 57px;

      @media (max-width: $breakpoints-mobile) {
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
      }
    }
  }
</style>
