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
  import IconArrowLeft from '~/assets/icons/icon-arrow-left_1.svg'
  import IconArrowRight from '~/assets/icons/icon-arrow-right.svg'
  import SkeletoneDescription from '~/components/skeletons/SkeletoneDescription.vue'
  import { MAX_RATING } from '~/constants/rating'

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

  const blackStarsCount = Math.round(rating?.rate || 0)
  const whiteStarsCount = MAX_RATING - blackStarsCount
  const quantity = ref(1)
  const decreaseQuantity = () => {
    if (quantity.value > 1) {
      --quantity.value
    }
  }
  const increaseQuantity = () => ++quantity.value
  const viewMore = ref(false)
  const viewHandler = () => (viewMore.value = !viewMore.value)
</script>

<template>
  <div class="info">
    <SkeletoneDescription v-if="loading" class="info__description-adding" />

    <template v-else>
      <h1>{{ title }}</h1>
      <div class="info__price">
        <p>$ {{ price }}</p>
        <IconShare class="info__price-share" />
      </div>

      <div class="info__raiting">
        <StarsRating :black-stars="blackStarsCount" :white-stars="whiteStarsCount" />
        <span>{{ rating?.count }} customer review</span>
      </div>

      <div class="info__description-adding">
        <div v-if="!viewMore" class="info__view" @click="viewHandler">
          <span>View more</span><IconArrowRight class="info__view-arrow" />
        </div>
        <div v-if="viewMore" class="info__view" @click="viewHandler">
          <span>View less</span><IconArrowLeft class="info__view-arrow" />
        </div>
        <p class="info__description" :class="{ 'info__description--expanded': viewMore }">
          {{ description }}
        </p>

        <div class="info__adding">
          <QuantityCounter
            :type="'productInfo'"
            :quantity="quantity"
            @decrease="decreaseQuantity"
            @increase="increaseQuantity"
          />
          <button @click="addToCart">ADD TO CART</button>
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
          <span>SKU:</span>
          <span class="info__meta-meaning">{{ id }}</span>
        </div>
        <div>
          <span>Categories:</span>
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

    &__price {
      display: flex;
      align-items: center;
      justify-content: space-between;

      @media (max-width: $breakpoints-mobile) {
        margin-top: 15px;
      }

      p {
        font-size: 20px;
        font-weight: 500;
        color: $accent-color;

        @media (max-width: $breakpoints-mobile) {
          margin: 0;
          font-size: 16px;
        }
      }

      &-share {
        width: 14px;
        height: 14px;
        fill: $primary-color;

        @media (min-width: $breakpoints-mobile) {
          display: none;
        }
      }
    }

    &__raiting {
      display: flex;
      margin-top: 70px;

      @media (max-width: $breakpoints-mobile) {
        display: none;
      }

      span {
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

    &__view {
      display: none;

      span {
        color: $accent-color;
      }

      @media (max-width: $breakpoints-mobile) {
        display: block;
      }

      &-arrow {
        height: 12px;
        margin-bottom: 1px;
        margin-left: 7px;
        vertical-align: middle;
      }
    }

    &__description {
      margin: 0;
      font-size: 16px;
      line-height: 27px;
      color: $main-text-color;

      @media (max-width: $breakpoints-mobile) {
        display: block;
        max-height: 54px;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: max-height 0.3s ease-in-out;

        &--expanded {
          display: block;
          max-height: 500px;
          overflow: visible;
        }
      }
    }

    &__adding {
      display: flex;
      gap: 23px;

      button {
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
