<script setup lang="ts">
  import type { Product } from '~/types/api'
  import StarsRating from './StarsRating.vue'
  import { useCartStore } from '~/store/cart'
  import { useNotification } from '~/composables/notification/useNotification'

  interface Props {
    product: Product
  }

  const { product } = defineProps<Props>()
  const { title, price, description, rating } = product
  const { addItem } = useCartStore()
  const { showSuccess } = useNotification()

  function addToCart() {
    addItem(product, quantity.value)
    showSuccess('The item was added to your Shopping bag', {
      link: 'VIEW CART',
    })
  }

  const MAX_RATING = 5
  const blackStarsCount = Math.round(rating?.rate || 0)
  const whiteStarsCount = MAX_RATING - blackStarsCount
  const quantity = ref(1)
  const decreaseQuantity = () => {
    if (quantity.value > 1) {
      --quantity.value
    }
  }
  const increaseQuantity = () => ++quantity.value
</script>
<template>
  <div class="info">
    <h1>{{ title }}</h1>
    <p class="info__price">$ {{ price }}</p>
    <div class="info__raiting">
      <StarsRating :black-stars="blackStarsCount" :white-stars="whiteStarsCount" />
      <span class="info__raiting-count">{{ rating?.count }} customer review</span>
    </div>
    <p class="info__description">{{ description }}</p>
    <div class="info__adding">
      <QuantityCounter
        :type="'productInfo'"
        :quantity="quantity"
        @decrease="decreaseQuantity"
        @increase="increaseQuantity"
      />
      <button class="info__adding-btn" @click="addToCart">ADD TO CART</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .info {
    h1 {
      font-size: 26px;
      font-weight: 400;
    }

    &__price {
      font-size: 20px;
      font-weight: 500;
      color: $accent-color;
    }

    &__raiting {
      display: flex;
      margin-top: 70px;
    }

    &__raiting-count {
      margin-left: 14px;
      font-size: 16px;
      color: $main-text-color;
    }

    &__description {
      margin-top: 19px;
      font-size: 16px;
      line-height: 27px;
      color: $main-text-color;
    }

    &__adding {
      display: flex;
      gap: 23px;
      margin-top: 48px;
    }

    &__adding-btn {
      width: 100%;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      background-color: $white;
      border: 1px solid $primary-color;
      border-radius: 4px;
    }
  }
</style>
