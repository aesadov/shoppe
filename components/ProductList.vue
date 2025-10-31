<script setup lang="ts">
  import type { Product } from '~/types/api'
  import ProductCard from '~/components/latestProducts/ProductCard.vue'
  interface Props {
    products: Product[] | null
    loading?: boolean
  }

  const SKELETONS_COUNT = 6
  const { products, loading } = defineProps<Props>()
  const skeletonCount = products?.length || SKELETONS_COUNT
</script>

<template>
  <div class="products">
    <ProductCard
      v-for="n of skeletonCount"
      v-show="loading"
      :key="'skeleton-' + n"
      :loading="true"
    />
    <ProductCard
      v-for="product in products"
      v-show="!loading"
      :key="product.id"
      :product="product"
      :loading="false"
    />
  </div>
</template>

<style lang="scss" scoped>
  .products {
    display: grid;
    flex: 1;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 70px 24px;

    @media (max-width: $breakpoints-mobile) {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 24px 16px;
    }
  }
</style>
