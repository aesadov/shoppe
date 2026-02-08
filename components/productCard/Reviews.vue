<script setup lang="ts">
  interface Props {
    rate: number
    count: number
  }

  const { rate, count } = defineProps<Props>()
</script>

<template>
  <div>rate: {{ rate }}</div>
  <div>count: {{ count }}</div>
</template>
