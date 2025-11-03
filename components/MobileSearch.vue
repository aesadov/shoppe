<script setup lang="ts">
  import IconMagnifyingGlassMobile from '~/assets/icons/Icon-magnifyingGlass-mobile.svg'

  interface Props {
    isMounted?: boolean
    isMobile: boolean
  }

  const { isMounted = false, isMobile = false } = defineProps<Props>()
</script>

<template>
  <div class="search" :class="{ 'search--hidden': isMounted && !isMobile }">
    <IconMagnifyingGlassMobile class="search__icon" />
    <span>Search</span>
  </div>
</template>

<style lang="scss" scoped>
  .search {
    display: none;
    gap: 8px;
    align-items: center;
    width: calc(100% - 10px);
    height: 32px;
    padding-left: 10px;
    margin: 8px 0 16px;
    font-size: 14px;
    color: $main-text-color;
    background: #efefef;
    border-radius: 4px;

    @media (max-width: $breakpoints-mobile) {
      display: flex;
    }

    &--hidden {
      display: none;
    }

    &__icon {
      width: 16px;
      height: 16px;
    }
  }
</style>
