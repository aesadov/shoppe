<script setup lang="ts">
  import IconCross from '~/assets/icons/Icon-cross.svg'

  const emit = defineEmits<{
    iconClick: []
  }>()

  const handleIconClick = () => {
    emit('iconClick')
  }
</script>
<template>
  <Transition name="fade-slide">
    <div class="filters">
      <div>Mobile Filters</div>
      <IconCross @click="handleIconClick" />
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
  .filters {
    display: flex;
    justify-content: space-between;
    height: 200px;
    background-color: beige;
  }

  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: all 0.3s ease-in-out;
  }

  .fade-slide-enter-from {
    opacity: 0;
    transform: translateY(-10px);
  }

  .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
</style>
