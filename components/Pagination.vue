<script setup lang="ts">
  interface Props {
    currentPage: number
    totalPages: number
    maxVisiblePages?: number
  }

  const props = withDefaults(defineProps<Props>(), {
    maxVisiblePages: 5,
  })

  const emit = defineEmits<{
    pageChange: [page: number]
  }>()

  const visiblePages = computed(() => {
    if (props.totalPages <= props.maxVisiblePages) {
      return Array.from({ length: props.totalPages }, (_, i) => i + 1)
    }

    const half = Math.floor(props.maxVisiblePages / 2)
    let start = props.currentPage - half
    let end = props.currentPage + half

    if (start < 1) {
      start = 1
      end = props.maxVisiblePages
    }

    if (end > props.totalPages) {
      end = props.totalPages
      start = props.totalPages - props.maxVisiblePages + 1
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  })

  const goToPage = (page: number) => {
    if (page >= 1 && page <= props.totalPages) {
      emit('pageChange', page)
    }
  }
</script>

<template>
  <div class="pagination">
    <div
      class="pagination__item pagination__item--prev"
      :class="{ 'pagination__item--disabled': currentPage === 1 }"
      @click="goToPage(currentPage - 1)"
    >
      <
    </div>

    <div
      v-for="page in visiblePages"
      :key="page"
      class="pagination__item"
      :class="{ 'pagination__item--active': currentPage === page }"
      @click="goToPage(page)"
    >
      {{ page }}
    </div>

    <div
      class="pagination__item pagination__item--next"
      :class="{ 'pagination__item--disabled': currentPage === totalPages }"
      @click="goToPage(currentPage + 1)"
    >
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .pagination {
    display: flex;
    gap: 12px;
    margin-top: 86px;

    &__item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 45px;
      height: 45px;
      font-size: 14px;
      cursor: pointer;
      border: 1px solid $divider-color;
      border-radius: 4px;
      transition: all 0.3s ease;

      &:hover:not(&--disabled) {
        background-color: #f5f5f5;
      }

      &--active {
        color: #fff;
        background-color: #000;
        border-color: #000;
      }

      &--disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }

      &--next:hover:not(&--disabled),
      &--prev:hover:not(&--disabled) {
        color: #fff;
        background-color: #000;
      }
    }
  }
</style>
