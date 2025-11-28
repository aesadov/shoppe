<script setup lang="ts">
  import IconFilterMobile from '~/assets/icons/Icon-filter-mobile.svg'
  import type { FiltersState, SelectOption } from '~/types/filters'

  interface Props {
    filters: FiltersState
    categories?: string[]
    isMobilePanelOpen?: boolean
  }

  const props = defineProps<Props>()

  const emit = defineEmits<{
    'filters-change': [filters: FiltersState]
    toggle: []
  }>()

  const handleToggle = () => {
    emit('toggle')
  }

  const handleFiltersChange = (newFilters: FiltersState) => {
    emit('filters-change', newFilters)
  }
</script>

<template>
  <div class="desktop-filters">
    <FiltersContent
      :filters="filters"
      :categories="categories"
      @filters-change="handleFiltersChange"
    />
  </div>

  <button class="mobile-filters-button" @click="handleToggle">
    <IconFilterMobile class="mobile-filters-button__icon" />
    <span>Filters</span>
  </button>

  <MobilePanel v-if="isMobilePanelOpen" title="Filters" @close="handleToggle">
    <FiltersContent
      :filters="filters"
      :categories="categories"
      @filters-change="handleFiltersChange"
    />
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
