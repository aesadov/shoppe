<script setup lang="ts">
  import IconCross from '~/assets/icons/Iconn-product-in-cart-cross.svg'
  interface Props {
    isMobile: boolean
  }

  const { isMobile } = defineProps<Props>()
</script>

<template>
  <div class="product">
    <div class="img" :class="{ 'img--mobile': isMobile }"></div>
    <div class="content">
      <div class="main" :class="{ 'main--mobile': isMobile }">
        <div class="main__description">
          <h2 class="main__title" :class="{ 'main__title--mobile': isMobile }">Product</h2>
          <span class="main__description-properties">Properties</span>
          <span class="main__description-price">$150</span>
        </div>
        <IconCross class="main__close" />
      </div>
      <div class="count">
        <button class="count__btn-left">–</button>
        <div class="count__data">3</div>
        <button class="count__btn-right">+</button>
      </div>
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

    .count {
      display: flex;
      align-self: flex-end;

      button {
        width: 28px;
        height: 33px;
        cursor: pointer;
        background-color: $btn-grey;
        border: none;
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
      }
    }
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
      font-size: 14px;
      font-weight: 400;

      &--mobile {
        font-size: 12px;
      }
    }

    &__description {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    &__close {
      width: 9px;
      height: 9px;
      margin-top: 5px;
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
