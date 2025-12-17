<script setup lang="ts">
  import { useCartStore } from '~/store/cart'
  import { storeToRefs } from 'pinia'
  import ProductInCart from './ProductInCart.vue'
  import { useMediaQuery } from '@vueuse/core'
  import { BREAKPOINTS } from '~/constants/breakpoints'
  import IconArrowLeft from '~/assets/icons/icon-arrow-left.svg'

  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.mobile})`)

  const { isShowCart, cartItems, totalPrice, totalItems } = storeToRefs(useCartStore())
  const { toggleSidebar, removeItem, increaseQuantity, decreaseQuantity } = useCartStore()
</script>

<template>
  <Transition name="fade">
    <div v-if="isShowCart" class="overlay" @click="toggleSidebar"></div>
  </Transition>

  <Transition name="cart-slide">
    <div v-if="isShowCart" class="cart" :class="{ 'cart--mobile': isMobile }">
      <div class="header">
        <div class="header__top" :class="{ 'header__top--mobile': isMobile }">
          <IconArrowLeft v-if="isMobile" class="header__icon" @click="toggleSidebar" />
          <h1 class="header__title" :class="{ 'header__title--mobile': isMobile }">Shopping bag</h1>
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
  </Transition>
</template>

<style lang="scss" scoped>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9998;
    width: 100vw;
    height: 100vh;
    background: rgb(0 0 0 / 40%);
  }

  .cart {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9999;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 360px;
    height: 100vh;
    padding: 72px 36px 24px;
    background: white;

    &--mobile {
      padding: 20px 16px 37px;
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
        margin: 0 -36px;
        margin-bottom: 21px;
        background-color: $divider-color;

        &--mobile {
          margin: 0 -16px;
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

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
  }

  .cart-slide-enter-active,
  .cart-slide-leave-active {
    transition:
      transform 0.3s ease,
      opacity 0.3s ease;
  }

  .cart-slide-enter-from,
  .cart-slide-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }

  .cart-slide-enter-to,
  .cart-slide-leave-from {
    opacity: 1;
    transform: translateX(0);
  }
</style>
