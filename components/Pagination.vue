<template>
  <div class="pagination">
    <div class="pagination__item">1</div>
    <div class="pagination__item">2</div>
    <div class="pagination__item">3</div>
    <div class="pagination__item">></div>
  </div>
</template>

<style lang="scss" scoped>
  .pagination {
    display: flex;
    gap: 12px;
    margin-top: 86px;

    @media (max-width: $breakpoints-mobile) {
      display: none;
    }

    &__item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 45px;
      height: 45px;
      cursor: pointer;
      border: 1px solid $divider-color;
      border-radius: 4px;
    }
  }
</style>
