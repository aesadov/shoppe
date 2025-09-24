<script setup lang="ts">
  import ProductCard from '~/components/latestProducts/ProductCard.vue'
  import { useGetAllProducts } from '~/composables/api/products/getAllProducts'
  import { useNotification } from '~/composables/notification/useNotification'
  import type { Product } from '~/types/api'
  import { onMounted, ref } from 'vue'

  const latestProducts = ref<Product[]>([])
  const isLoading = ref(true)

  const { showError } = useNotification()
  onMounted(async () => {
    try {
      isLoading.value = true
      latestProducts.value = await useGetAllProducts(6)
    } catch (error) {
      console.error('Error loading products:', error)
      showError('Error loading products')
    } finally {
      isLoading.value = false
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
      <!-- Скелетоны во время загрузки -->
      <ProductCard v-for="n of 6" v-if="isLoading" :key="'skeleton-' + n" :loading="true" />

      <!-- Реальные продукты после загрузки -->
      <ProductCard
        v-for="product in latestProducts"
        v-else
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
