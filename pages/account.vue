<script setup lang="ts">
  import BaseInput from '~/components/BaseInput.vue'
  import { useInput } from '~/composables/useInput'

  const {
    value: userName,
    error: userNameError,
    hasError: userNameHasError,
    resetForm: resetUserName,
  } = useInput()

  const {
    value: password,
    error: passError,
    hasError: passHasError,
    resetForm: resetPass,
  } = useInput()

  const saveUserInfo = ref(false)

  const handleSubmit = () => {}
</script>
<template>
  <div class="account">
    <h1>My account</h1>
    <div class="account__buttons">
      <button>Sign in</button>
      <button>Register</button>
    </div>
    <form @submit.prevent="handleSubmit">
      <BaseInput
        v-model="userName"
        :placeholder="'Username'"
        type="form"
        :error="userNameHasError"
        :error-message="userNameError"
      />
      <BaseInput
        v-model="password"
        :placeholder="'Password'"
        type="form"
        :error="passHasError"
        :error-message="passError"
      />
      <label>
        <input v-model="saveUserInfo" type="checkbox" :checked="saveUserInfo" />
        <span>Remember me</span>
      </label>

      <button type="submit">SIGN IN</button>
      <div>Have you forgot your password?</div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
  .account {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
