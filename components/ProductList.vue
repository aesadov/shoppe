<!-- <script setup lang="ts">
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
    grid-template-columns: repeat(3, 1fr);
    gap: 70px 24px;
    align-items: start;

    @media (max-width: $breakpoints-mobile) {
      grid-template-columns: repeat(2, 1fr);
      gap: 24px 16px;
    }
  }
</style> -->

<script setup lang="ts">
  import type { Product } from '~/types/api'
  import ProductCard from '~/components/latestProducts/ProductCard.vue'

  interface Props {
    products?: Product[] | null
    loading?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    products: null,
    loading: false,
  })

  const SKELETONS_COUNT = 6
</script>

<template>
  <div class="products">
    <!-- Если идёт загрузка или продукты ещё не получены -->
    <template v-if="loading || !products">
      <ProductCard v-for="n in SKELETONS_COUNT" :key="'skeleton-' + n" :loading="true" />
    </template>

    <!-- Когда данные есть -->
    <template v-else>
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
  .products {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 70px 24px;
    align-items: start;

    @media (max-width: $breakpoints-mobile) {
      grid-template-columns: repeat(2, 1fr);
      gap: 24px 16px;
    }
  }
</style>
