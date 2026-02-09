<script setup lang="ts">
  interface Props {
    description: string
  }

  const { description } = defineProps<Props>()
</script>

<template>
  <div class="description">{{ description }}</div>
</template>

<style lang="scss" scoped>
  .description {
    font-size: 16px;
    color: $main-text-color;

    @media (max-width: $breakpoints-mobile) {
      font-size: 14px;
    }
  }
</style>
