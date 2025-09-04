<script setup lang="ts">
  interface Props {
    product: Product
  }

  const { product } = defineProps<Props>()
</script>

<template>
  <div class="product">
    <div class="product__image-wrapper">
      <NuxtImg
        class="product__img"
        v-if="product.image"
        :src="product.image"
        alt="product img"
        loading="lazy"
      />
      <div class="product__hover-plate">ADD TO CART</div>
    </div>
    <h3 class="product__name">{{ product.title }}</h3>
    <p class="product__price">$ {{ product.price }}</p>
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
