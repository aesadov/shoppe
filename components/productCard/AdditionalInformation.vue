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
  <div class="info">
    <div>
      id: <span>{{ id }}</span>
    </div>
    <div>
      title: <span>{{ title }}</span>
    </div>
    <div>
      price: <span>{{ price }}</span>
    </div>
    <div>
      category: <span>{{ category }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .info {
    font-size: 16px;

    span {
      color: $main-text-color;
    }

    @media (max-width: $breakpoints-mobile) {
      font-size: 14px;
    }
  }
</style>
