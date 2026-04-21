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

  const {
    value: confirmPassword,
    error: confirmPassError,
    hasError: confirmPassHasError,
    resetForm: resetConfirmPass,
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
      console.log('Registr attempt', {
        userName: userName.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
      })
      resetUserName()
      resetPass()
      resetConfirmPass()
    }
  }
</script>

<template>
  <div class="register">
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
      <BaseInput
        v-model="confirmPassword"
        :placeholder="'Confirm Password'"
        type="form"
        :error="confirmPassHasError"
        :error-message="confirmPassError"
      />
      <label>
        <input v-model="saveUserInfo" type="checkbox" :checked="saveUserInfo" />
        <span>Remember me</span>
      </label>

      <button type="submit">REGISTER</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
  .register {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 500px;

    form {
      display: flex;
      flex-direction: column;

      button {
        height: 53px;
        margin-top: 69px;
        font-size: 16px;
        font-weight: 700;
        color: $white;
        cursor: pointer;
        background-color: $primary-color;
        border-radius: 4px;

        @media (max-width: $breakpoints-mobile) {
          height: 32px;
          margin-top: 12px;
          font-size: 12px;
          font-weight: 400;
        }
      }

      label {
        @media (max-width: $breakpoints-mobile) {
          font-size: 12px;
          font-weight: 400;
        }
      }
    }
  }
</style>
