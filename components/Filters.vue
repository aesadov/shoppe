<script setup lang="ts">
  import IconFilterMobile from '~/assets/icons/Icon-filter-mobile.svg'
  import type { FiltersState } from '~/types/filters'
  import IconCross from '~/assets/icons/Icon-cross.svg'

  interface Props {
    filters: FiltersState
    categories?: string[]
    isMobilePanelOpen: boolean
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

  <ModalSidebar :is-visible="isMobilePanelOpen" @close="handleToggle">
    <template #default="{ close }">
      <div class="filters-mobile-panel">
        <div class="filters-mobile-panel__header">
          <h2 class="filters-mobile-panel__title">Filters</h2>
          <IconCross @click="close" />
        </div>

        <div class="filters-mobile-panel__content">
          <FiltersContent
            :filters="filters"
            :categories="categories"
            @filters-change="handleFiltersChange"
          />
        </div>
      </div>
    </template>
  </ModalSidebar>
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

  .filters-mobile-panel {
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__title {
      margin: 0;
      font-family: $logoFontFamily;
      font-size: 25px;
      font-weight: 400;
    }
  }
</style>
