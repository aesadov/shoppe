<template v-if="loading">
  <div class="skeleton-text skeleton-name"></div>
  <div class="skeleton-text skeleton-price"></div>
</template>

<style lang="scss" scoped>
  @use '~/assets/scss/mixins/skeleton';

  .skeleton-text {
    display: block;
    margin-right: auto;
    margin-left: 0;

    @include skeleton.skeleton-base;
  }

  .skeleton-name {
    width: 80%;
    height: 20px;
    margin-top: 24px;

    @media (max-width: $breakpoints-mobile) {
      width: 60%;
      height: 16px;
      margin-top: 6px;
    }
  }

  .skeleton-price {
    width: 60%;
    height: 20px;
    margin-top: 16px;

    @media (max-width: $breakpoints-mobile) {
      width: 40%;
      height: 16px;
      margin-top: 4px;
    }
  }
</style>
