<script setup lang="ts">
  const isSignInShow = ref(true)

  const signInShowHandler = () => (isSignInShow.value = !isSignInShow.value)
</script>

<template>
  <div class="account">
    <h1>My account</h1>

    <div class="account__buttons">
      <button
        class="account__btn"
        :class="{ 'account__btn--active': isSignInShow }"
        @click="isSignInShow = true"
      >
        Sign in
      </button>
      <button
        class="account__btn"
        :class="{ 'account__btn--active': !isSignInShow }"
        @click="isSignInShow = false"
      >
        Register
      </button>
    </div>

    <SignIn v-if="isSignInShow" />
    <Register v-else />
  </div>
</template>

<style lang="scss" scoped>
  .account {
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      margin-bottom: 60px;
      font-size: 33px;
      font-weight: 500;
    }

    &__buttons {
      display: flex;
      gap: 2px;
      width: 100%;
      max-width: 500px;
      padding: 5px;
      margin-bottom: 126px;
      background-color: #e9e9ed;
      border-radius: 8px;
    }

    &__btn {
      flex: 1;
      height: 50px;
      font-size: 16px;
      font-weight: 500;
      text-align: center;
      cursor: pointer;
      background: transparent;
      border: none;
      border-radius: 6px;
      transition: all 0.25s ease;

      &:hover:not(.account__btn--active) {
        color: #000;
        background-color: rgb(0 0 0 / 3%);
      }

      &--active {
        background-color: #fff;
        box-shadow:
          0 2px 8px rgb(0 0 0 / 5%),
          0 1px 2px rgb(0 0 0 / 10%);
      }
    }
  }
</style>
