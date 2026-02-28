<script lang="ts" setup>
  import { clearError, navigateTo } from 'nuxt/app'

  const handleClearError = () => {
    clearError()

    navigateTo('/')
  }
</script>

<template>
  <div class="error">
    <h1>404 ERROR</h1>
    <div>
      <p>This page not found;</p>
      <p>back to home and start again</p>
    </div>
    <button @click="handleClearError">HOMEPAGE</button>
  </div>
</template>

<style lang="scss" scoped>
  .error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
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
</style>
