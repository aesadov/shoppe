<script setup lang="ts">
  interface Props {
    quantity: number
    type: 'cart' | 'productInfo'
  }

  defineProps<Props>()

  const emit = defineEmits<{
    decrease: []
    increase: []
  }>()

  const decreaseQuantity = () => emit('decrease')
  const increaseQuantity = () => emit('increase')
</script>

<template>
  <div class="counter">
    <button
      class="counter__btn-left"
      :class="{ 'button--product-info': type === 'productInfo' }"
      @click="decreaseQuantity"
    >
      –
    </button>
    <div class="counter__data" :class="{ 'counter__data--product-info': type === 'productInfo' }">
      {{ quantity }}
    </div>
    <button
      class="counter__btn-right"
      :class="{ 'button--product-info': type === 'productInfo' }"
      @click="increaseQuantity"
    >
      +
    </button>
  </div>
</template>

<style lang="scss" scoped>
  .counter {
    display: flex;
    align-self: flex-end;

    button {
      width: 28px;
      height: 33px;
      cursor: pointer;
      background-color: $btn-grey;
      border: none;

      &.button--product-info {
        width: 34px;
        height: 53px;
      }
    }

    &__btn-left {
      border-radius: 4px 0 0 4px;
    }

    &__btn-right {
      border-radius: 0 4px 4px 0;
    }

    &__data {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 33px;
      background-color: $btn-grey;

      &--product-info {
        width: 34px;
        height: 53px;
      }
    }
  }
</style>
