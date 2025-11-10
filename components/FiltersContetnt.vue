<script setup lang="ts">
  interface Props {
    isMobilePanelOpen: boolean
  }

  const { isMobilePanelOpen } = defineProps<Props>()
</script>

<template>
  <div v-if="isMobilePanelOpen" class="filters-content">Mobile Filters Content</div>
  <div v-else class="filters-content">Desctop Filters Content</div>
</template>

<style lang="scss" scoped>
  .filters-content {
    padding: 16px;
  }
</style>
