<script setup lang="ts">
  interface Props {
    currentPage: number
    totalPages: number
    maxVisiblePages?: number
  }

  const MAX_VISIBLE_PAGES = 5

  const { maxVisiblePages = MAX_VISIBLE_PAGES, currentPage, totalPages } = defineProps<Props>()

  const emit = defineEmits<{
    pageChange: [page: number]
  }>()

  const visiblePages = computed(() => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const half = Math.floor(maxVisiblePages / 2)
    let start = currentPage - half
    let end = currentPage + half

    if (start < 1) {
      start = 1
      end = maxVisiblePages
    }

    if (end > totalPages) {
      end = totalPages
      start = totalPages - maxVisiblePages + 1
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  })

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
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
