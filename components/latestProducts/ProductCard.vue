<script setup lang="ts">
  import { useNotification } from '~/composables/notification/useNotification'
  import type { Product } from '~/types/api'
  import { ContentLoader } from 'vue-content-loader'

  interface Props {
    product?: Product
    loading?: boolean
  }

  const { product, loading = false } = defineProps<Props>()
  const { showSuccess } = useNotification()

  const addToCart = () => {
    if (!product) return
    showSuccess('The item was added to your Shopping bag', { link: 'VIEW CART' })
  }
</script>

<template>
  <div class="product">
    <div class="product__image-wrapper">
      <template v-if="loading">
        <ContentLoader
          :viewBox="'0 0 300 300'"
          :width="'100%'"
          :height="'100%'"
          :speed="2"
          primary-color="#f3f3f3"
          secondary-color="#ecebeb"
        >
          <rect x="0" y="0" rx="8" ry="8" width="100%" height="100%" />
        </ContentLoader>
      </template>
      <template v-else>
        <NuxtImg
          v-if="product?.image"
          class="product__img"
          :src="product.image"
          alt="product img"
          loading="lazy"
        />
        <div class="product__hover-plate" @click="addToCart">ADD TO CART</div>
      </template>
    </div>

    <template v-if="loading">
      <ContentLoader
        :viewBox="'0 0 250 25'"
        :width="'80%'"
        :height="'20px'"
        :speed="2"
        primary-color="#f3f3f3"
        secondary-color="#ecebeb"
        class="skeleton-text skeleton-name"
      >
        <rect x="0" y="0" rx="4" ry="4" width="100%" height="20" />
      </ContentLoader>
      <ContentLoader
        :viewBox="'0 0 150 25'"
        :width="'60%'"
        :height="'20px'"
        :speed="2"
        primary-color="#f3f3f3"
        secondary-color="#ecebeb"
        class="skeleton-text skeleton-price"
      >
        <rect x="0" y="0" rx="4" ry="4" width="100%" height="20" />
      </ContentLoader>
    </template>
    <template v-else-if="product">
      <h3 class="product__name">{{ product.title }}</h3>
      <p class="product__price">$ {{ product.price }}</p>
    </template>
  </div>
</template>

<style lang="scss" scoped>
  .product {
    position: relative;

    &__image-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      aspect-ratio: 1 / 1;
      overflow: hidden;
      background: #f5f5f5;
      border-radius: 8px;

      @media (max-width: $breakpoints-mobile) {
        border-radius: 4px;
      }
    }

    .skeleton-text {
      display: block;
    }

    .skeleton-name {
      margin-top: 24px;

      @media (max-width: $breakpoints-mobile) {
        margin-top: 6px;
      }
    }

    .skeleton-price {
      margin-top: 16px;

      @media (max-width: $breakpoints-mobile) {
        margin-top: 4px;
      }
    }

    &__hover-plate {
      position: absolute;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 0;
      overflow: hidden;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      background-color: #ffffff80;
      border-bottom-right-radius: 8px;
      border-bottom-left-radius: 8px;
      transition: height 0.3s ease;

      @media (max-width: $breakpoints-mobile) {
        font-size: 12px;
        font-weight: 400;
      }
    }

    .product__image-wrapper:hover &__hover-plate {
      height: 17%;
    }

    &__img {
      display: block;
      width: auto;
      max-width: 90%;
      height: auto;
      max-height: 90%;
      object-fit: contain;
    }

    &__name {
      margin-top: 24px;
      font-size: 20px;
      font-weight: 400;

      @media (max-width: $breakpoints-mobile) {
        margin-top: 6px;
        font-size: 14px;
      }
    }

    &__price {
      margin-top: 16px;
      font-size: 20px;
      font-weight: 500;
      color: $accent-color;

      @media (max-width: $breakpoints-mobile) {
        margin-top: 4px;
        font-size: 12px;
      }
    }
  }
</style>
