<script setup lang="ts">
  import CartSidebar from '~/components/cart/CartSidebar.vue'
  import { useNotification } from '~/composables/notification/useNotification'

  const { notifications, hideNotification, handleLinkClick } = useNotification()
</script>

<template>
  <div class="app-container">
    <CartSidebar />
    <AppHeader />
    <NuxtPage />
    <AppFooter />
    <Notification
      :notifications="notifications"
      @close="hideNotification"
      @link-click="handleLinkClick"
    />
  </div>
</template>
