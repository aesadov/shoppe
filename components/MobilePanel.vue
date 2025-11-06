<script setup lang="ts">
  import IconCross from '~/assets/icons/Icon-cross.svg'

  interface Props {
    title?: string
    showCloseButton?: boolean
  }

  defineProps<Props>()

  const emit = defineEmits<{
    close: []
  }>()

  const handleOverlayClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      emit('close')
    }
  }

  const handleCloseClick = () => {
    emit('close')
  }
</script>

<template>
  <div class="panel-overlay" @click="handleOverlayClick">
    <div class="panel">
      <div v-if="$slots.header || title" class="panel__header">
        <slot name="header">
          <h2 v-if="title" class="panel__title">{{ title }}</h2>
          <IconCross v-if="showCloseButton" class="panel__close" @click="handleCloseClick" />
        </slot>
      </div>

      <div class="panel__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .panel-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgb(0 0 0 / 50%);
    animation: fade-in 0.3s ease-out forwards;
  }

  .panel {
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

    &__close {
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

  @media (width <= 400px) {
    .panel {
      max-width: 100%;
    }
  }
</style>
