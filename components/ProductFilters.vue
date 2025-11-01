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
  <DesktopProductFilters />
  <button class="mob-filters" @click="handleBtnClick">
    <IconFilterMobile class="icon-filter" />
    <span>Filters</span>
  </button>
</template>

<style lang="scss" scoped>
  .mob-filters {
    display: none;
    align-items: center;
    width: 70px;
    padding: 0;
    margin-bottom: 16px;
    color: $accent-color;
    cursor: pointer;
    background: none;
    border: none;

    @media (max-width: $breakpoints-mobile) {
      display: flex;
    }
  }

  .icon-filter {
    width: 13px;
    margin-right: 5px;
  }
</style>
