<!-- <script setup lang="ts">
  import type { Product, Review } from '~/types/api'
  import StarsRating from './StarsRating.vue'
  import { MAX_RATING } from '~/constants/rating'

  const props = defineProps<{
    reviews: Review[]
    title: string
  }>()
</script>

<template>
  <div class="examples">
    <h2>{{ reviews.length }} Reviews for {{ title }}</h2>
    <div v-for="(review, index) in reviews" :key="review.name" class="examples__review">
      <div class="examples__review-name">
        <h3>{{ review.name }}</h3>
        <span>{{ review.date }}</span>
      </div>
      <StarsRating :black-stars="review.rate" :white-stars="MAX_RATING - review.rate" />
      <p>{{ review.review }}</p>
      <hr v-if="index !== reviews.length - 1" class="examples__divider" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .examples {
    h2 {
      margin-bottom: 76px;
      font-size: 20px;
      font-weight: 400;

      @media (max-width: $breakpoints-mobile) {
        font-size: 14px;
      }
    }

    &__review {
      color: $main-text-color;

      p {
        margin-top: 24px;
        font-size: 16px;
      }

      &-name {
        display: flex;
        gap: 16px;
        align-items: center;
        margin-bottom: 16px;

        h3 {
          font-size: 20px;
          font-weight: 400;
          color: $primary-color;

          @media (max-width: $breakpoints-mobile) {
            font-size: 14px;
          }
        }

        span {
          font-size: 14px;
        }
      }
    }

    &__divider {
      margin: 40px 0 24px;
      border: none;
      border-top: 1px solid rgba($divider-color, 1);
    }
  }
</style> -->

<script setup lang="ts">
  import type { Product, Review } from '~/types/api'
  import StarsRating from './StarsRating.vue'
  import { MAX_RATING } from '~/constants/rating'

  const props = defineProps<{
    reviews: Review[]
    title: string
  }>()
</script>

<template>
  <div class="examples">
    <h2>{{ reviews.length }} Reviews for {{ title }}</h2>
    <div v-for="(review, index) in reviews" :key="review.name" class="examples__review">
      <div class="examples__review-name">
        <h3>{{ review.name }}</h3>
        <span>{{ review.date }}</span>
      </div>
      <StarsRating :black-stars="review.rate" :white-stars="MAX_RATING - review.rate" />
      <p>{{ review.review }}</p>
      <hr v-if="index !== reviews.length - 1" class="examples__divider" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .examples {
    h2 {
      margin-bottom: 76px;
      font-size: 20px;
      font-weight: 400;

      @media (max-width: $breakpoints-mobile) {
        margin: 16px 0;
        font-size: 14px;
        font-weight: 600;
        color: $main-text-color;
      }
    }

    &__review {
      color: $main-text-color;

      p {
        margin-top: 24px;
        font-size: 16px;

        @media (max-width: $breakpoints-mobile) {
          margin-top: 6px;
          font-size: 14px;
        }
      }
    }

    &__review-name {
      display: flex;
      gap: 16px;
      align-items: center;
      margin-bottom: 16px;

      @media (max-width: $breakpoints-mobile) {
        gap: 10px;
        margin-bottom: 6px;
      }

      h3 {
        font-size: 20px;
        font-weight: 400;
        color: $primary-color;

        @media (max-width: $breakpoints-mobile) {
          font-size: 14px;
        }
      }

      span {
        font-size: 14px;

        @media (max-width: $breakpoints-mobile) {
          font-size: 12px;
        }
      }
    }

    &__divider {
      margin: 40px 0 24px;
      border: none;
      border-top: 1px solid rgba($divider-color, 1);

      @media (max-width: $breakpoints-mobile) {
        margin: 16px 0 10px;
      }
    }
  }
</style>
