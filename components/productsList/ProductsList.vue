<script setup lang="ts">
  import ProductCard from '~/components/productsList/ProductCard.vue'
  import type { Product } from '~/types/api'

  const props = defineProps<{
    type: 'latest' | 'similar'
    products: Product[] | null
    pending: boolean
  }>()
</script>

<template>
  <div class="latest">
    <div class="latest__header">
      <h2 v-if="type === 'latest'" class="latest__title">Shop The Latest</h2>
      <h2 v-if="type === 'similar'" class="latest__title-similar">Similar items</h2>
      <NuxtLink v-if="type === 'latest'" to="/catalogue" class="latest__link">View All</NuxtLink>
    </div>
    <div class="latest__products">
      <!-- Скелетоны -->
      <ProductCard
        v-for="n of 6"
        v-if="type === 'latest'"
        v-show="pending"
        :key="'skeleton-' + n"
        :loading="true"
      />
      <ProductCard
        v-for="n of products?.values.length"
        v-if="type === 'similar'"
        v-show="pending"
        :key="'skeleton-' + n"
        :loading="true"
      />

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

      &-similar {
        font-size: 26px;
        font-weight: 400;

        @media (max-width: $breakpoints-mobile) {
          margin: 20px 0 15px;
          font-size: 16px;
        }
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
