<script lang="ts" setup>
  import { clearError, navigateTo } from 'nuxt/app'
  import CartSidebar from '~/components/cart/CartSidebar.vue'
  import { useNotification } from '~/composables/notification/useNotification'

  const { notifications, hideNotification, handleLinkClick } = useNotification()

  const handleClearError = () => {
    clearError()
    navigateTo('/')
  }
</script>

<template>
  <div class="app-container">
    <CartSidebar />
    <AppHeader />

    <div class="error-wrapper">
      <div class="error">
        <h1>404 ERROR</h1>
        <div>
          <p>This page not found;</p>
          <p>back to home and start again</p>
        </div>
        <button @click="handleClearError">HOMEPAGE</button>
      </div>
    </div>

    <AppFooter class="footer" />
    <Notification
      :notifications="notifications"
      @close="hideNotification"
      @link-click="handleLinkClick"
    />
  </div>
</template>

<style lang="scss" scoped>
  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .error-wrapper {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
  }

  .error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 500px;
    text-align: center;

    h1 {
      margin: 0 0 30px;
      font-size: 33px;
      font-weight: 500;

      @media (max-width: $breakpoints-mobile) {
        margin: 0 0 7px;
        font-size: 20px;
      }
    }

    p {
      margin: 0;
      font-size: 20px;
      color: $main-text-color;

      @media (max-width: $breakpoints-mobile) {
        margin: 7px 0;
        font-size: 12px;
      }
    }

    button {
      width: 187px;
      height: 53px;
      margin-top: 70px;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      background-color: $white;
      border-color: $primary-color;
      border-radius: 4px;
      box-shadow: none;

      @media (max-width: $breakpoints-mobile) {
        width: 115px;
        height: 32px;
        margin-top: 17px;
        font-size: 12px;
        font-weight: 400;
      }

      &:hover {
        color: $white;
        background-color: $primary-color;
      }
    }
  }

  .footer {
    @media (max-width: $breakpoints-mobile) {
      display: none;
    }
  }
</style>
