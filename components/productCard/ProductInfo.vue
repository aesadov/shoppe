<script setup lang="ts">
  import type { Product } from '~/types/api'
  import StarsRating from './StarsRating.vue'
  import { useCartStore } from '~/store/cart'
  import { useNotification } from '~/composables/notification/useNotification'
  import IconTwitter from '~/assets/icons/Icon-twitter.svg'
  import IconInstagram from '~/assets/icons/Icon-Instagram.svg'
  import IconFaceBook from '~/assets/icons/Icon-FB.svg'
  import IconMail from '~/assets/icons/Icon-mail.svg'
  import IconShare from '~/assets/icons/Icon-share.svg'
  import SkeletoneDescription from '~/components/skeletons/SkeletoneDescription.vue'

  interface Props {
    product: Product
    loading: boolean
  }

  const { product } = defineProps<Props>()
  const { title, price, description, rating, category, id } = product
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
    <SkeletoneDescription v-if="loading" class="info__description-adding" />

    <template v-else>
      <h1>{{ title }}</h1>
      <div class="info__price-share">
        <p class="info__price">$ {{ price }}</p>
        <IconShare class="info__share" />
      </div>

      <div class="info__raiting">
        <StarsRating :black-stars="blackStarsCount" :white-stars="whiteStarsCount" />
        <span class="info__raiting-count">{{ rating?.count }} customer review</span>
      </div>

      <div class="info__description-adding">
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

      <div class="info__social">
        <IconMail class="info__social-icon" />
        <IconInstagram class="info__social-icon" />
        <IconFaceBook class="info__social-icon" />
        <IconTwitter class="info__social-icon" />
      </div>

      <div class="info__meta">
        <div>
          <span class="info__meta-name">SKU:</span>
          <span class="info__meta-meaning">{{ id }}</span>
        </div>
        <div>
          <span class="info__meta-name">Categories:</span>
          <span class="info__meta-meaning">{{ category }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
  .info {
    flex: 1;
    min-width: 300px;

    @media (width <= $breakpoints-tablet) {
      flex: 0 1 100%;
      min-width: 100%;
    }

    h1 {
      font-size: 26px;
      font-weight: 400;

      @media (max-width: $breakpoints-mobile) {
        display: -moz-box;
        display: block;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -moz-line-clamp: 2;
        font-size: 20px;
        -webkit-box-orient: vertical;
        -moz-box-orient: vertical;
      }
    }

    &__price-share {
      display: flex;
      align-items: center;
      justify-content: space-between;

      @media (max-width: $breakpoints-mobile) {
        margin-top: 15px;
      }
    }

    &__price {
      font-size: 20px;
      font-weight: 500;
      color: $accent-color;

      @media (max-width: $breakpoints-mobile) {
        margin: 0;
        font-size: 16px;
      }
    }

    &__share {
      width: 14px;
      height: 14px;
      fill: $primary-color;

      @media (min-width: $breakpoints-mobile) {
        display: none;
      }
    }

    &__raiting {
      display: flex;
      margin-top: 70px;

      @media (max-width: $breakpoints-mobile) {
        display: none;
      }

      &-count {
        margin-left: 14px;
        font-size: 16px;
        color: $main-text-color;
      }
    }

    &__description-adding {
      display: flex;
      flex-direction: column;
      gap: 48px;
      margin-top: 19px;

      @media (max-width: $breakpoints-mobile) {
        flex-direction: column-reverse;
        gap: 16px;
        margin-top: 24px;
      }
    }

    &__description {
      margin: 0;
      font-size: 16px;
      line-height: 27px;
      color: $main-text-color;

      @media (max-width: $breakpoints-mobile) {
        display: -moz-box;
        display: block;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -moz-line-clamp: 2;
        -webkit-box-orient: vertical;
        -moz-box-orient: vertical;
      }
    }

    &__adding {
      display: flex;
      gap: 23px;

      &-btn {
        width: 100%;
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
        background-color: $white;
        border: 1px solid $primary-color;
        border-radius: 4px;

        @media (max-width: $breakpoints-mobile) {
          height: 32px;
          font-size: 12px;
          font-weight: 400;
        }
      }
    }

    &__social {
      margin-top: 81px;

      @media (max-width: $breakpoints-mobile) {
        display: none;
      }

      &-icon {
        height: 17px;
        margin-right: 24px;
        color: $main-text-color;
      }
    }

    &__meta {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-top: 40px;
      font-size: 16px;

      @media (max-width: $breakpoints-mobile) {
        display: none;
      }

      &-meaning {
        display: inline-block;
        margin-left: 16px;
        color: $main-text-color;

        &::first-letter {
          text-transform: uppercase;
        }
      }
    }
  }
</style>
