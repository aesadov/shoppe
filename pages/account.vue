<script setup lang="ts">
  import { ref } from 'vue'
  import BaseInput from '~/components/BaseInput.vue'
  import { useInput } from '~/composables/useInput'
  import { fieldValidators } from '~/utils/validation'

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

  const validateForm = () => {
    userNameHasError.value = false
    passHasError.value = false

    let isValid = true

    const usernameValidation = fieldValidators.username(userName.value)
    if (!usernameValidation.isValid) {
      userNameError.value = usernameValidation.error
      userNameHasError.value = true
      isValid = false
    }

    const passwordValidation = fieldValidators.password(password.value)
    if (!passwordValidation.isValid) {
      passError.value = passwordValidation.error
      passHasError.value = true
      isValid = false
    }

    return isValid
  }

  const handleSubmit = () => {
    if (validateForm()) {
      // Логика входа
      console.log('Login attempt', { userName: userName.value, password: password.value })
    }
  }
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
