<script setup lang="ts">
  interface Props {
    isVisible: boolean
  }

  const props = defineProps<Props>()

  const emit = defineEmits<{
    close: []
  }>()

  const closeModal = () => {
    emit('close')
  }
</script>

<template>
  <Transition name="fade">
    <div v-if="isVisible" class="modal-sidebar__overlay" @click="closeModal" />
  </Transition>

  <Transition name="modal-sidebar-slide">
    <div v-if="isVisible" class="modal-sidebar">
      <slot :close="closeModal" />
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
  .modal-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9999;
    box-sizing: border-box;
    width: 360px;
    height: 100vh;
    padding: 16px;
    background: white;

    &__overlay {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9998;
      width: 100vw;
      height: 100vh;
      background: rgb(0 0 0 / 40%);
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
  }

  .modal-sidebar-slide-enter-active,
  .modal-sidebar-slide-leave-active {
    transition:
      transform 0.3s ease,
      opacity 0.3s ease;
  }

  .modal-sidebar-slide-enter-from,
  .modal-sidebar-slide-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }

  .modal-sidebar-slide-enter-to,
  .modal-sidebar-slide-leave-from {
    opacity: 1;
    transform: translateX(0);
  }
</style>
