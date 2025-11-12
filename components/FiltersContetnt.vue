<script setup lang="ts">
  import IconMagnifyingGlass from '~/assets/icons/Icon-magnifyingGlass.svg'
  import IconArrowDown from '~/assets/icons/icon-arrow-down.svg'

  interface FilterState {
    search: string
    category: string
    sortBy: string
    minPrice: number
    maxPrice: number
    onSale: boolean
    inStock: boolean
  }

  interface SelectOption {
    value: string
    label: string
  }

  const props = defineProps<{
    categories?: SelectOption[]
    sortOptions?: SelectOption[]
    initialMinPrice?: number
    initialMaxPrice?: number
    minPriceLimit?: number
    maxPriceLimit?: number
  }>()

  const defaultCategories: SelectOption[] = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'books', label: 'Books' },
    { value: 'home', label: 'Home & Garden' },
  ]

  const defaultSortOptions: SelectOption[] = [
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' },
    { value: 'newest', label: 'Newest First' },
  ]

  const MIN_PRICE = props.minPriceLimit || 0
  const MAX_PRICE = props.maxPriceLimit || 500
  const INITIAL_MIN = props.initialMinPrice || 40
  const INITIAL_MAX = props.initialMaxPrice || 180

  const filters = reactive<FilterState>({
    search: '',
    category: '',
    sortBy: '',
    minPrice: INITIAL_MIN,
    maxPrice: INITIAL_MAX,
    onSale: false,
    inStock: false,
  })

  const categories = computed(() => props.categories || defaultCategories)
  const sortOptions = computed(() => props.sortOptions || defaultSortOptions)

  const minPriceLimit = MIN_PRICE
  const maxPriceLimit = MAX_PRICE

  const updateMinPrice = (event: Event) => {
    const value = Number((event.target as HTMLInputElement).value)
    if (value > filters.maxPrice) {
      filters.minPrice = filters.maxPrice
    } else {
      filters.minPrice = value
    }
  }

  const updateMaxPrice = (event: Event) => {
    const value = Number((event.target as HTMLInputElement).value)
    if (value < filters.minPrice) {
      filters.maxPrice = filters.minPrice
    } else {
      filters.maxPrice = value
    }
  }

  const resetFilters = () => {
    Object.assign(filters, {
      search: '',
      category: '',
      sortBy: '',
      minPrice: INITIAL_MIN,
      maxPrice: INITIAL_MAX,
      onSale: false,
      inStock: false,
    })
  }

  const emit = defineEmits<{
    'filters-change': [filters: FilterState]
  }>()

  watch(
    filters,
    (newFilters) => {
      emit('filters-change', newFilters)
    },
    { deep: true, immediate: true },
  )

  const sliderTrackStyle = computed(() => {
    const minPercent = ((filters.minPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100
    const maxPercent = ((filters.maxPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100
    return {
      background: `linear-gradient(to right, 
      #ddd ${minPercent}%, 
      #000000 ${minPercent}%, 
      #000000 ${maxPercent}%, 
      #ddd ${maxPercent}%)`,
    }
  })

  // Генерация уникальных ID
  const searchId = 'search-' + Math.random().toString(36).substr(2, 9)
  const categoryId = 'category-' + Math.random().toString(36).substr(2, 9)
  const sortId = 'sort-' + Math.random().toString(36).substr(2, 9)
  const onSaleId = 'on-sale-' + Math.random().toString(36).substr(2, 9)
  const inStockId = 'in-stock-' + Math.random().toString(36).substr(2, 9)
</script>

<template>
  <div class="filters">
    <!-- Search -->
    <div class="filters__group">
      <div class="filters__input-wrapper">
        <input
          :id="searchId"
          v-model="filters.search"
          type="text"
          placeholder="Search..."
          class="filters__input"
        />
        <IconMagnifyingGlass class="filters__search-icon" />
      </div>
    </div>

    <!-- Category -->
    <div class="filters__group">
      <select :id="categoryId" v-model="filters.category" class="filters__select">
        <option value="" disabled selected>Categories</option>
        <option v-for="category in categories" :key="category.value" :value="category.value">
          {{ category.label }}
        </option>
      </select>
      <IconArrowDown class="filters__select-icon" />
    </div>

    <!-- Sort By -->
    <div class="filters__group">
      <select :id="sortId" v-model="filters.sortBy" class="filters__select">
        <option value="" disabled selected>Sort by</option>
        <option v-for="sortOption in sortOptions" :key="sortOption.value" :value="sortOption.value">
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
          v-model.number="filters.minPrice"
          type="range"
          :min="minPriceLimit"
          :max="maxPriceLimit"
          class="filters__slider-input filters__slider-input--min"
          @input="updateMinPrice"
        />
        <input
          v-model.number="filters.maxPrice"
          type="range"
          :min="minPriceLimit"
          :max="maxPriceLimit"
          class="filters__slider-input filters__slider-input--max"
          @input="updateMaxPrice"
        />
        <div class="filters__slider-values">
          <span class="filters__slider-label"
            >Price: ${{ filters.minPrice }} - ${{ filters.maxPrice }}</span
          >
          <button type="reset" class="filters__reset" @click="resetFilters">Reset</button>
        </div>
      </div>
    </div>

    <!-- Switches -->
    <div class="filters__switches">
      <label class="filters__switch">
        <span class="filters__switch-text">On sale</span>
        <input
          :id="onSaleId"
          v-model="filters.onSale"
          type="checkbox"
          class="filters__switch-input"
        />
        <span class="filters__switch-slider"></span>
      </label>
      <label class="filters__switch">
        <span class="filters__switch-text">In stock</span>
        <input
          :id="inStockId"
          v-model="filters.inStock"
          type="checkbox"
          class="filters__switch-input"
        />
        <span class="filters__switch-slider"></span>
      </label>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  $border-radius: 4px;
  $transition: all 0.2s ease-in-out;
  $gray-medium: #6c757d;
  $white: #fff;

  @mixin focus-state {
    outline: none;
    border-color: $accent-color;
    box-shadow: 0 0 0 2px rgba($accent-color, 0.25);
  }

  @mixin input-base {
    height: 53px;
    padding: 8px;
    font-family: $textFontFamily;
    font-size: 14px;
    color: $main-text-color;
    border: 1px solid $divider-color;
    border-radius: $border-radius;
    transition: $transition;

    &:focus {
      @include focus-state;
    }
  }

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
    @include input-base;

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
    @include input-base;

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
