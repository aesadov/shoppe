<script setup lang="ts">
  import { useCartStore } from '@/store/cart'
  import { storeToRefs } from 'pinia'
  import ProductInCart from '~/components/ProductInCart.vue'
  import { useMediaQuery } from '@vueuse/core'
  import { BREAKPOINTS } from '~/constants/breakpoints'
  import ModalSidebar from '~/components/ModalSidebar.vue'

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
        <CartHeader :is-mobile="isMobile" :total-items="totalItems" @close="close" />

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

        <CartFooter :is-mobile="isMobile" :total-items="totalItems" :total-price="totalPrice" />
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
  }
</style>
