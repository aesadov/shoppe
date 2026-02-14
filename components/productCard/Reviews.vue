<script setup lang="ts">
  import ReviewsExamples from '~/components/productCard/ReviewsExamples.vue'
  import AddReview from '~/components/productCard/AddReview.vue'
  import type { Product, Review } from '~/types/api'

  const props = defineProps<{
    reviews: Review[]
    product: Product
  }>()
</script>

<template>
  <div class="reviews">
    <ReviewsExamples class="component" :title="product.title" :reviews="reviews" />
    <AddReview class="component" />
  </div>
</template>

<style lang="scss" scoped>
  .reviews {
    display: flex;
    gap: 90px;
    width: 100%;

    @media (max-width: $breakpoints-mobile) {
      flex-direction: column;
      gap: 16px;
    }
  }

  .component {
    flex: 1;
  }
</style>
