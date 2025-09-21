<template>
  <div class="skeleton-image"></div>
</template>

<style lang="scss" scoped>
  @use '~/assets/scss/mixins/skeleton';

  .skeleton-image {
    width: 100%;
    height: 100%;

    @include skeleton.skeleton-base;

    border-radius: 8px;

    @media (max-width: $breakpoints-mobile) {
      border-radius: 4px;
    }
  }
</style>
