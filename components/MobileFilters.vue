<script setup lang="ts">
  import IconCross from '~/assets/icons/Icon-cross.svg'

  const emit = defineEmits<{
    closeClick: []
  }>()

  const handleOverlayClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      //проверяем, что кликнули именно по серой зоне
      emit('closeClick')
    }
  }

  const handleCrossClick = () => {
    emit('closeClick')
  }
</script>

<template>
  <div class="filters-overlay" @click="handleOverlayClick">
    <div class="filters">
      <div class="filters__header">
        <h2 class="filters__title">Filters</h2>
        <IconCross class="filters__cross" @click="handleCrossClick" />
      </div>
      <div class="filters__content">
        <div>Mobile Filters Content</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .filters-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgb(0 0 0 / 50%);
    animation: fade-in 0.3s ease-out forwards;
  }

  .filters {
    position: fixed;
    inset: 0 0 0 auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    padding: 16px;
    overflow-y: auto;
    background: white;
    transform: translateX(100%);
    animation: slide-in 0.4s ease-out forwards;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
    }

    &__title {
      margin: 0;
      font-family: $logoFontFamily;
      font-size: 25px;
      font-weight: 400;
    }

    &__cross {
      cursor: pointer;
    }

    &__content {
      flex: 1;
    }
  }

  @keyframes slide-in {
    from {
      transform: translateX(100%);
    }

    to {
      transform: translateX(0);
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
</style>
