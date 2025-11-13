<script setup lang="ts">
  import IconMagnifyingGlass from '~/assets/icons/Icon-magnifyingGlass.svg'
  import IconArrowDown from '~/assets/icons/icon-arrow-down.svg'
  import type { FiltersState, SelectOption } from '~/types/filters'
  import { useFiltersLogic } from '~/composables/filters/useFiltersLogic'
  import { useFilterOptions } from '~/composables/filters/useFilterOptions'

  interface Props {
    filters: FiltersState
    categories?: SelectOption[]
    sortOptions?: SelectOption[]
    minPriceLimit?: number
    maxPriceLimit?: number
  }

  const props = defineProps<Props>()

  const emit = defineEmits<{
    'filters-change': [filters: FiltersState]
  }>()

  const { defaultSortOptions } = useFilterOptions()

  const {
    localFilters,
    updateMinPrice,
    updateMaxPrice,
    resetFilters,
    sliderTrackStyle,
    generateUniqueId,
  } = useFiltersLogic(props, emit)

  const searchId = generateUniqueId('search')
  const categoryId = generateUniqueId('category')
  const sortId = generateUniqueId('sort')
  const onSaleId = generateUniqueId('on-sale')
  const inStockId = generateUniqueId('in-stock')
</script>

<template>
  <div class="filters">
    <!-- Search -->
    <div class="filters__group">
      <div class="filters__input-wrapper">
        <input
          :id="searchId"
          v-model="localFilters.search"
          type="text"
          placeholder="Search..."
          class="filters__input"
        />
        <IconMagnifyingGlass class="filters__search-icon" />
      </div>
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
          v-for="sortOption in sortOptions?.length ? sortOptions : defaultSortOptions"
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
        <div class="filters__slider-track" :style="sliderTrackStyle"></div>
        <input
          v-model.number="localFilters.minPrice"
          type="range"
          :min="minPriceLimit"
          :max="maxPriceLimit"
          class="filters__slider-input filters__slider-input--min"
          @input="updateMinPrice"
        />
        <input
          v-model.number="localFilters.maxPrice"
          type="range"
          :min="minPriceLimit"
          :max="maxPriceLimit"
          class="filters__slider-input filters__slider-input--max"
          @input="updateMaxPrice"
        />
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

  .filters__input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    border-bottom: 1px solid $divider-color;

    &:focus-within {
      border-bottom-color: $accent-color;
    }
  }

  .filters__search-icon {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    margin-right: 8px;
    color: $main-text-color;
    pointer-events: none;
  }

  .filters__input {
    @include input.input-base;

    flex: 1;
    height: 35px;
    padding: 0;
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
    height: 60px;
    margin: 8px 0;
  }

  .filters__slider-track {
    position: absolute;
    top: 50%;
    z-index: 1;
    width: 100%;
    height: 2px;
    transform: translateY(-50%);
  }

  .filters__slider-input {
    position: absolute;
    top: 50%;
    z-index: 2;
    width: 100%;
    height: 2px;
    margin: 0;
    appearance: none;
    pointer-events: none;
    background: transparent;
    transform: translateY(-50%);
  }

  .filters__slider-input--min,
  .filters__slider-input--max {
    &::-webkit-slider-thumb {
      width: 3px;
      height: 10px;
      appearance: none;
      pointer-events: all;
      cursor: pointer;
      background: $primary-color;
      border: none;
      border-radius: 0;
      transition: $transition;
    }

    &::-moz-range-thumb {
      width: 3px;
      height: 10px;
      pointer-events: all;
      cursor: pointer;
      background: $primary-color;
      border: none;
      border-radius: 0;
      transition: $transition;
    }

    &::-webkit-slider-thumb:hover {
      background: $primary-color;
      transform: scale(1.2);
    }

    &::-moz-range-thumb:hover {
      background: $primary-color;
      transform: scale(1.2);
    }
  }

  .filters__slider-values {
    position: absolute;
    right: 0;
    bottom: -7px;
    left: 0;
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: space-between;
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

    .filters__slider {
      height: 40px;
    }

    .filters__slider-values {
      position: absolute;
      right: 0;
      bottom: -15px;
      left: 0;
      display: flex;
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
