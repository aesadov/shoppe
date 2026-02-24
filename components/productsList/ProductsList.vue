<script setup lang="ts">
  import ProductCard from '~/components/productsList/ProductCard.vue'
  import type { Product } from '~/types/api'

  const props = defineProps<{
    type: 'latest' | 'similar'
    products: Product[] | null
    pending: boolean
  }>()

  const isLatest = computed(() => props.type === 'latest')
  const isSimilar = computed(() => props.type === 'similar')
</script>

<template>
  <div class="latest">
    <div class="latest__header">
      <h2 v-if="isLatest" class="latest__title">Shop The Latest</h2>
      <h2 v-if="isSimilar" class="latest__title-similar">Similar items</h2>
      <NuxtLink v-if="type === 'latest'" to="/catalogue" class="latest__link">View All</NuxtLink>
    </div>
    <div class="latest__products" :class="{ 'latest__products--horizontal-scroll': isSimilar }">
      <!-- Скелетоны -->
      <ProductCard
        v-for="n of 6"
        v-if="isLatest"
        v-show="pending"
        :key="'skeleton-' + n"
        :loading="true"
      />
      <ProductCard
        v-for="n of products?.values.length"
        v-if="isSimilar"
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
    }

    &__title-similar {
      font-size: 26px;
      font-weight: 400;

      @media (max-width: $breakpoints-mobile) {
        margin: 20px 0 15px;
        font-size: 16px;
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

  .latest__products--horizontal-scroll {
    @media (max-width: $breakpoints-mobile) {
      display: flex;
      gap: 16px;
      padding-left: 16px;
      margin-left: -16px;
      overflow: auto hidden;
      scrollbar-width: none;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
      -ms-overflow-style: none;

      &::-webkit-scrollbar {
        display: none;
      }

      > * {
        flex: 0 0 auto;
        width: 136px;
      }
    }
  }
</style>
