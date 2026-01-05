<script setup lang="ts">
  import CartSidebar from '~/components/cart/CartSidebar.vue'
</script>
<template>
  <div class="app-container">
    <CartSidebar />
    <AppHeader />
    <NuxtPage />
    <AppFooter />
    <Notification />
  </div>
</template>
