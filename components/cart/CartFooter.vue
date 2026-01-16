<script setup lang="ts">
  interface Props {
    isMobile: boolean
    totalItems: number
    totalPrice: number
  }

  const { isMobile, totalItems, totalPrice } = defineProps<Props>()
</script>

<template>
  <div class="footer">
    <hr class="footer__divider" :class="{ 'footer__divider--mobile': isMobile }" />
    <div class="footer__subtotal" :class="{ 'footer__subtotal--mobile': isMobile }">
      <div>Subtotal ({{ totalItems }} items)</div>
      <div>${{ totalPrice }}</div>
    </div>
    <button class="footer__btn" :class="{ 'footer__btn--mobile': isMobile }">CHECKOUT</button>
  </div>
</template>

<style lang="scss" scoped>
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
</style>
