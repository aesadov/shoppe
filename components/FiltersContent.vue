<script setup lang="ts">
  import IconArrowDown from '~/assets/icons/icon-arrow-down.svg'
  import type { FiltersState, SelectOption } from '~/types/filters'
  import { useFiltersLogic } from '~/composables/filters/useFiltersLogic'
  import { useFilterOptions } from '~/composables/filters/useFilterOptions'
  import { shallowRef, onMounted, computed } from 'vue'

  interface Props {
    filters: FiltersState
    categories?: SelectOption[]
    sortOptions?: SelectOption[]
    minPriceLimit?: number
    maxPriceLimit?: number
  }

  const props = withDefaults(defineProps<Props>(), {
    minPriceLimit: 0,
    maxPriceLimit: 500,
    categories: () => [],
    sortOptions: () => [],
  })

  const emit = defineEmits<{
    'filters-change': [filters: FiltersState]
  }>()

  const { defaultSortOptions } = useFilterOptions()

  const { localFilters, updatePriceRange, resetFilters, generateUniqueId } = useFiltersLogic(
    props,
    emit,
  )

  const searchId = generateUniqueId('search')
  const categoryId = generateUniqueId('category')
  const sortId = generateUniqueId('sort')
  const onSaleId = generateUniqueId('on-sale')
  const inStockId = generateUniqueId('in-stock')

  const multiRangeSlider = shallowRef()

  onMounted(async () => {
    try {
      const module = await import('multi-range-slider-vue')
      multiRangeSlider.value = module.default
    } catch (error) {
      console.error('Failed to load multi-range-slider-vue:', error)
    }
  })

  const handleSliderInput = (event: { minValue: number; maxValue: number }) => {
    updatePriceRange(event.minValue, event.maxValue)
  }

  const handleSearchSubmit = () => {
    console.log('Search submitted:', localFilters.search)
  }

  const sortedOptions = computed(() => {
    return props.sortOptions?.length ? props.sortOptions : defaultSortOptions
  })
</script>

<template>
  <div class="filters">
    <!-- Search -->
    <div class="filters__search-wrapper">
      <BaseInput
        v-model="localFilters.search"
        type="search"
        :placeholder="'Search...'"
        :show-search-icon="true"
        :show-submit-icon="false"
        :show-agreement="false"
        @submit="handleSearchSubmit"
      />
    </div>

    <!-- Category -->
    <div class="filters__group">
      <select :id="categoryId" v-model="localFilters.category" class="filters__select">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category.value" :value="category.value">
          {{ category.label }}
        </option>
      </select>
      <IconArrowDown class="filters__select-icon" />
    </div>

    <!-- Sort By -->
    <div class="filters__group">
      <select :id="sortId" v-model="localFilters.sortBy" class="filters__select">
        <option value="">Default Sorting</option>
        <option
          v-for="sortOption in sortedOptions"
          :key="sortOption.value"
          :value="sortOption.value"
        >
          {{ sortOption.label }}
        </option>
      </select>
      <IconArrowDown class="filters__select-icon" />
    </div>

    <!-- Price Range Slider -->
    <div class="filters__group">
      <div class="filters__slider">
        <ClientOnly>
          <component
            :is="multiRangeSlider"
            :min="minPriceLimit"
            :max="maxPriceLimit"
            :step="1"
            :min-value="localFilters.minPrice"
            :max-value="localFilters.maxPrice"
            class="filters__multi-slider"
            @input="handleSliderInput"
          />
        </ClientOnly>

        <div class="filters__slider-values">
          <span class="filters__slider-label">
            Price: ${{ localFilters.minPrice }} - ${{ localFilters.maxPrice }}
          </span>
          <div>
            <button type="button" class="filters__reset" @click="resetFilters">Reset</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Switches -->
    <div class="filters__switches">
      <label class="filters__switch">
        <span class="filters__switch-text">On sale</span>
        <input
          :id="onSaleId"
          v-model="localFilters.onSale"
          type="checkbox"
          class="filters__switch-input"
        />
        <span class="filters__switch-slider"></span>
      </label>
      <label class="filters__switch">
        <span class="filters__switch-text">In stock only</span>
        <input
          :id="inStockId"
          v-model="localFilters.inStock"
          type="checkbox"
          class="filters__switch-input"
        />
        <span class="filters__switch-slider"></span>
      </label>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '~/assets/scss/mixins/input';

  .filters {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 300px;
    font-family: $textFontFamily;
    border-radius: 8px;
  }

  .filters__group {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .filters__search-wrapper {
    margin-bottom: 24px;

    // Стилизация BaseInput для интеграции с существующим дизайном
    :deep(.input-container) {
      width: 100%;
    }

    :deep(.input-wrapper) {
      position: relative;
      display: flex;
      align-items: center;
      border-bottom: 1px solid $divider-color;

      &:focus-within {
        border-bottom-color: $accent-color;
      }
    }

    :deep(.input) {
      flex: 1;
      height: 35px;
      padding: 0;
      margin: 0;
      color: $main-text-color;
      background: transparent;
      border: none;
      border-radius: 0;

      &:focus {
        outline: none;
        box-shadow: none;
      }

      &::placeholder {
        color: $main-text-color;
        opacity: 0.7;
      }
    }
  }

  .filters__select {
    @include input.input-base;

    width: 100%;
    padding: 12px 16px;
    font-size: 14px;
    color: $primary-color;
    appearance: none;
    cursor: pointer;
    background: transparent;

    option[value=''][disabled] {
      color: $main-text-color;
      opacity: 0.7;
    }

    option:not([disabled]) {
      color: $main-text-color;
      background: $white;
    }
  }

  .filters__select-icon {
    position: absolute;
    top: calc(50% + 2px);
    right: 12px;
    width: 16px;
    height: 16px;
    color: $main-text-color;
    pointer-events: none;
    transform: translateY(-50%);
  }

  .filters__slider {
    position: relative;
    margin: 24px 0 8px;
  }

  .filters__slider-fallback {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    font-size: 14px;
    color: $main-text-color;
  }

  .filters__slider-values {
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
  }

  .filters__slider-label {
    flex-shrink: 0;
    font-size: 14px;
    font-weight: 400;
    color: $main-text-color;
  }

  .filters__reset {
    flex-shrink: 0;
    font-size: 14px;
    color: $accent-color;
    white-space: nowrap;
    cursor: pointer;
    background: transparent;
    border: none;
    transition: $transition;

    &:hover {
      color: $main-text-color;
    }

    &:active {
      transform: translateY(1px);
    }
  }

  .filters__switches {
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin-top: 24px;
  }

  .filters__switch {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }

  .filters__switch-slider {
    position: relative;
    flex-shrink: 0;
    width: 33px;
    height: 20px;
    background: $main-text-color;
    border-radius: 12px;
    transition: $transition;

    &::before {
      position: absolute;
      top: 4px;
      left: 4px;
      width: 12px;
      height: 12px;
      content: '';
      background: $white;
      border-radius: 50%;
      transition: $transition;
    }
  }

  .filters__switch-input {
    display: none;

    &:checked + .filters__switch-slider {
      background: $accent-color;

      &::before {
        transform: translateX(13px);
      }
    }
  }

  .filters__switch-text {
    font-size: 16px;
    font-weight: 400;
    color: $primary-color;
  }

  @media (width <= $breakpoints-mobile) {
    .filters {
      gap: 16px;
      max-width: none;
    }

    .filters__slider-values {
      flex-direction: row;
      gap: 16px;
      align-items: center;
      justify-content: space-between;
    }

    .filters__slider-label {
      align-self: center;
      margin: 0;
    }

    .filters__reset {
      align-self: center;
    }
  }
</style>

<style lang="scss">
  .filters__multi-slider {
    position: relative;
    width: 100% !important;
    padding: 15px 0 !important;
    margin: -15px 0 !important;
    border: none !important;
    box-shadow: none !important;

    .bar-inner {
      height: 2px;
      background-color: $primary-color !important;
      border: none !important;
    }

    .bar-left,
    .bar-right {
      height: 2px;
      padding: 0 !important;
      background-color: $divider-color !important;
      border: none !important;
      box-shadow: none !important;
    }

    .thumb {
      position: relative;
      top: -4px;
      width: 2px !important;
      height: 10px !important;
      background: $primary-color !important;

      &::before {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 10;
        display: block !important;
        width: 40px;
        height: 40px;
        cursor: pointer;
        content: '' !important;
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
        transform: translate(-50%, -50%);
      }

      &:hover {
        background: $accent-color !important;
      }

      &::after {
        display: none !important;
      }
    }

    .ruler {
      display: none !important;
    }

    .label {
      display: none !important;
    }
  }
</style>
