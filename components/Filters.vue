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
    <FiltersContetnt />
  </div>

  <button class="mobile-filters-button" @click="handleToggle">
    <IconFilterMobile class="mobile-filters-button__icon" />
    <span>Filters</span>
  </button>

  <MobilePanel v-if="isMobilePanelOpen" title="Filters" @close="handleClose">
    <FiltersContetnt />
  </MobilePanel>
</template>

<style lang="scss" scoped>
  .desktop-filters {
    flex-shrink: 0;
    width: 266px;
    margin-right: 31px;

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
