<script setup lang="ts">
  import IconFilterMobile from '~/assets/icons/Icon-filter-mobile.svg'

  interface Props {
    isMobilePanelOpen?: boolean
  }

  const { isMobilePanelOpen } = defineProps<Props>()

  const emit = defineEmits<{
    toggle: []
    close: []
  }>()

  const handleToggle = () => {
    emit('toggle')
  }

  const handleClose = () => {
    emit('close')
  }
</script>

<template>
  <div class="desktop-filters">
    <FiltersContetnt :is-mobile-panel-open="isMobilePanelOpen" />
  </div>

  <button class="mobile-filters-button" @click="handleToggle">
    <IconFilterMobile class="mobile-filters-button__icon" />
    <span>Filters</span>
  </button>

  <MobilePanel v-if="isMobilePanelOpen" title="Filters" @close="handleClose">
    <FiltersContetnt :is-mobile-panel-open="isMobilePanelOpen" />
  </MobilePanel>
</template>

<style lang="scss" scoped>
  .desktop-filters {
    flex-shrink: 0;
    width: 266px;
    height: 336px;
    margin-right: 31px;
    background-color: rgb(205 205 205);

    @media (max-width: $breakpoints-mobile) {
      display: none;
    }
  }

  .mobile-filters-button {
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
