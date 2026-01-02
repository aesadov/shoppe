<script setup lang="ts">
  import { useCartStore } from '@/store/cart'
  import { storeToRefs } from 'pinia'
  import ProductInCart from './ProductInCart.vue'
  import { useMediaQuery } from '@vueuse/core'
  import { BREAKPOINTS } from '~/constants/breakpoints'
  import IconArrowLeft from '~/assets/icons/icon-arrow-left.svg'
  import ModalSidebar from './ModalSidebar.vue'

  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.mobile})`)

  const { isShowCart, cartItems, totalPrice, totalItems } = storeToRefs(useCartStore())
  const { toggleSidebar, removeItem, increaseQuantity, decreaseQuantity } = useCartStore()

  const handleClose = () => {
    toggleSidebar()
  }
</script>

<template>
  <ModalSidebar :is-visible="isShowCart" @close="handleClose">
    <template #default="{ close }">
      <div class="cart" :class="{ 'cart--mobile': isMobile }">
        <div class="header">
          <div class="header__top" :class="{ 'header__top--mobile': isMobile }">
            <IconArrowLeft v-if="isMobile" class="header__icon" @click="close" />
            <h1 class="header__title" :class="{ 'header__title--mobile': isMobile }">
              Shopping bag
            </h1>
          </div>
          <div class="header__count">{{ totalItems }} items</div>
        </div>

        <div class="cart__list">
          <ProductInCart
            v-for="product in cartItems"
            :key="product.id"
            :product="product"
            :is-mobile="isMobile"
            @remove-product="removeItem"
            @increase-quantity="increaseQuantity"
            @decrease-quantity="decreaseQuantity"
          />
        </div>

        <div class="footer">
          <hr class="footer__divider" :class="{ 'footer__divider--mobile': isMobile }" />
          <div class="footer__subtotal" :class="{ 'footer__subtotal--mobile': isMobile }">
            <div>Subtotal ({{ totalItems }} items)</div>
            <div>${{ totalPrice }}</div>
          </div>
          <button class="footer__btn" :class="{ 'footer__btn--mobile': isMobile }">CHECKOUT</button>
        </div>
      </div>
    </template>
  </ModalSidebar>
</template>

<style lang="scss" scoped>
  .cart {
    height: 100%;
    padding: 62px 0 24px;

    &--mobile {
      padding: 0;
    }

    .header {
      &__top {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;

        &--mobile {
          margin-bottom: 25px;
        }
      }

      &__title {
        justify-self: center;
        margin-bottom: 17px;
        font-size: 16px;
        font-weight: 400;

        &--mobile {
          margin-bottom: 0;
        }
      }

      &__icon {
        width: 9px;
        height: 16px;
        cursor: pointer;
      }

      &__count {
        margin-bottom: 7px;
        font-size: 12px;
        color: $main-text-color;
      }
    }

    &__list {
      flex: 1;
      padding: 0 36px;
      margin: 0 -36px;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 4px;
      }

      &::-webkit-scrollbar-track {
        background: #f1f1f1;
      }

      &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 2px;
      }
    }

    .footer {
      margin-top: 24px;

      &__divider {
        width: 100%;
        margin-bottom: 21px;
        background-color: $divider-color;

        &--mobile {
          margin-bottom: 21px;
        }
      }

      &__subtotal {
        display: flex;
        justify-content: space-between;
        margin-bottom: 21px;
        font-size: 16px;

        &--mobile {
          margin-bottom: 16px;
          font-size: 12px;
        }
      }

      &__btn {
        width: 100%;
        height: 53px;
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
        background-color: $white;
        border-color: $primary-color;
        border-radius: 4px;
        box-shadow: none;

        &--mobile {
          height: 32px;
          font-size: 12px;
        }

        &:hover {
          color: $white;
          background-color: $primary-color;
        }
      }
    }
  }
</style>
