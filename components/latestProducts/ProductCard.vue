<script setup lang="ts">
  import { useNotification } from '~/composables/notification/useNotification'
  import type { Product } from '~/types/api'
  import { ref } from 'vue'
  import SkeletonImg from '~/components/skeletons/SkeletonImg.vue'
  import SkeletoneDescription from '~/components/skeletons/SkeletoneDescription.vue'

  interface Props {
    product?: Product
    loading?: boolean
  }

  const { product, loading = false } = defineProps<Props>()
  const { showSuccess } = useNotification()
  const isHovered = ref(false)

  const addToCart = () => {
    if (!product) return
    showSuccess('The item was added to your Shopping bag', { link: 'VIEW CART' })
  }

  const handleMouseOver = () => {
    if (!loading && product) {
      isHovered.value = true
    }
  }

  const handleMouseOut = () => {
    isHovered.value = false
  }
</script>

<template>
  <div class="product" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
    <div class="product__image-wrapper">
      <SkeletonImg v-if="loading" />
      <template v-else>
        <NuxtImg
          v-if="product?.image"
          class="product__img"
          :src="product.image"
          alt="product img"
          loading="lazy"
        />
        <div
          class="product__hover-plate"
          :class="{ 'product__hover-plate--visible': isHovered }"
          @click="addToCart"
        >
          ADD TO CART
        </div>
      </template>
    </div>
    <SkeletoneDescription v-if="loading" />
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

      &--visible {
        height: 17%;
      }
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
      display: -webkit-box;
      margin-top: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      font-size: 20px;
      font-weight: 400;
      -webkit-box-orient: vertical;

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
