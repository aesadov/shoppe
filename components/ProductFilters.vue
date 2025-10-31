<script setup>
  import IconFilterMobile from '~/assets/icons/Icon-filter-mobile.svg'
</script>
<template>
  <div class="filters">Desktop Filters</div>
  <div class="mob-filters">
    <IconFilterMobile class="icon-filter" />
    <span>Filters</span>
  </div>
</template>

<style lang="scss" scoped>
  .filters {
    flex-shrink: 0;
    width: 266px;
    height: 336px;
    margin-right: 31px;
    background-color: rgb(205 205 205);

    @media (max-width: $breakpoints-mobile) {
      display: none;
    }
  }

  .mob-filters {
    display: none;
    color: $accent-color;

    @media (max-width: $breakpoints-mobile) {
      display: block;
      margin-bottom: 16px;
    }
  }

  .icon-filter {
    width: 13px;
    margin-right: 5px;
  }
</style>
