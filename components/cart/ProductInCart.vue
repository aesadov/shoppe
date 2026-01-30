<script setup lang="ts">
  import IconCross from '~/assets/icons/Iconn-product-in-cart-cross.svg'
  import type { CartItem } from '~/types/api'

  interface Props {
    isMobile: boolean
    product: CartItem
  }

  const props = defineProps<Props>()

  const emit = defineEmits<{
    'remove-product': [id: number]
    'increase-quantity': [id: number]
    'decrease-quantity': [id: number]
  }>()

  const remove = () => emit('remove-product', props.product.id)
  const decreaseQuantity = () => emit('decrease-quantity', props.product.id)
  const increaseQuantity = () => emit('increase-quantity', props.product.id)
</script>

<template>
  <div class="product">
    <NuxtImg
      class="img"
      :alt="props.product.title"
      :class="{ 'img--mobile': isMobile }"
      :src="props.product.image"
    />
    <div class="content">
      <div class="main" :class="{ 'main--mobile': isMobile }">
        <div class="main__description">
          <h2 class="main__title" :class="{ 'main__title--mobile': isMobile }">
            {{ props.product.title }}
          </h2>
          <span class="main__description-properties">{{ props.product.category }}</span>
          <span class="main__description-price">${{ props.product.price }}</span>
        </div>
        <IconCross class="main__close" @click="remove" />
      </div>
      <QuantityCounter
        :type="'cart'"
        :quantity="props.product.quantity"
        @decrease="decreaseQuantity"
        @increase="increaseQuantity"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .product {
    display: flex;
    height: 138px;
    margin-bottom: 22px;
  }

  .img {
    width: 138px;
    height: 138px;
    margin-right: 8px;
    object-fit: contain;
    background-color: $divider-color;
    border-radius: 4px;

    &--mobile {
      width: 136px;
      height: 136px;
    }
  }

  .content {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
  }

  .main {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 400;

    &--mobile {
      font-size: 12px;
    }

    &__title {
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 1;
      line-clamp: 1;
      font-size: 14px;
      font-weight: 400;
      -webkit-box-orient: vertical;

      &--mobile {
        font-size: 12px;
      }
    }

    &__description {
      display: flex;
      flex-direction: column;
      gap: 5px;
      min-width: 0;
      margin-right: 10px;
    }

    &__close {
      flex-shrink: 0;
      width: 9px;
      height: 9px;
      margin: 5px 0 0 5px;
      cursor: pointer;
    }

    &__description-properties {
      color: $main-text-color;
    }

    &__description-price {
      color: $accent-color;
    }
  }
</style>
