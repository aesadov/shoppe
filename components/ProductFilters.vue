<script setup lang="ts">
  import IconFilterMobile from '~/assets/icons/Icon-filter-mobile.svg'

  const emit = defineEmits<{
    btnClick: []
  }>()

  const handleBtnClick = () => {
    emit('btnClick')
  }
</script>
<template>
  <DesktopProductFilters class="desctop-filters" />
  <button class="mob-filters" @click="handleBtnClick">
    <IconFilterMobile class="mob-filters__icon" />
    <span>Filters</span>
  </button>
</template>

<style lang="scss" scoped>
  .desctop-filters {
    @media (max-width: $breakpoints-mobile) {
      display: none;
    }
  }

  .mob-filters {
    display: none;
    align-items: center;
    width: 70px;
    padding: 0;
    color: $accent-color;
    cursor: pointer;
    background: none;
    border: none;

    @media (max-width: $breakpoints-mobile) {
      display: flex;
    }

    &__icon {
      width: 13px;
      margin-right: 5px;
    }
  }
</style>
