<template>
  <div class="latest">
    <div class="latest__header">
      <h2 class="latest__title">Shop The Latest</h2>
      <NuxtLink to="" class="latest__link">View All</NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .latest {
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 39px;

      @media (max-width: $breakpoints-mobile) {
        margin-bottom: 13px;
      }
    }

    &__title {
      font-size: 33px;
      font-weight: 500;

      @media (max-width: $breakpoints-mobile) {
        font-size: 16px;
        font-weight: 400;
      }
    }

    &__link {
      font-size: 20px;
      font-weight: 500;
      color: $accent-color;
      cursor: pointer;

      @media (max-width: $breakpoints-mobile) {
        font-size: 14px;
        font-weight: 400;
      }
    }
  }
</style>
