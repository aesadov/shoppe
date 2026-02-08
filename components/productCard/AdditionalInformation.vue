<script setup lang="ts">
  interface Props {
    id: number
    title: string
    price: number
    category: string
  }

  const { id, title, price, category } = defineProps<Props>()
</script>

<template>
  <div>id: {{ id }}</div>
  <div>title: {{ title }}</div>
  <div>price: {{ price }}</div>
  <div>category: {{ category }}</div>
</template>
