<script setup lang="ts">
  const emit = defineEmits<{
    close: []
  }>()

  const closeFilters = () => {
    emit('close')
  }
</script>
<template>
  <MobilePanel title="Filters" @close="closeFilters">
    <div class="filters-content">
      <div>Mobile Filters Content</div>
    </div>
  </MobilePanel>
</template>
