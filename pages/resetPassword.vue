<script setup lang="ts">
  import BaseInput from '~/components/BaseInput.vue'
  import { useInput } from '~/composables/useInput'
  import { fieldValidators } from '~/utils/validation'
  import { useNotification } from '~/composables/notification/useNotification'

  const {
    value: email,
    error: emailError,
    hasError: emailHasError,
    resetForm: resetEmail,
  } = useInput()

  const { showSuccess } = useNotification()

  const validateForm = () => {
    emailHasError.value = false

    let isValid = true

    const emailValidation = fieldValidators.email(email.value)
    if (!emailValidation.isValid) {
      emailError.value = emailValidation.error
      emailHasError.value = true
      isValid = false
    }

    return isValid
  }

  const handleSubmit = () => {
    if (validateForm()) {
      showSuccess('The password has been sent to your email')
      resetEmail()
    }
  }
</script>

<template>
  <div class="password">
    <form @submit.prevent="handleSubmit">
      <h1>Have you Forgotten Your Password ?</h1>
      <p>
        If you've forgotten your password, enter your e-mail address and we'll send you an e-mail
      </p>
      <BaseInput
        v-model="email"
        :placeholder="'Email'"
        type="form"
        :error="emailHasError"
        :error-message="emailError"
      />

      <button type="submit">RESET PASSWORD</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
  .password {
    display: flex;
    flex-direction: column;
    align-items: center;

    form {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 500px;
      text-align: center;

      @media (max-width: $breakpoints-mobile) {
        margin-top: 16px;
      }

      h1 {
        margin-bottom: 39px;
        font-size: 33px;
        font-weight: 500;

        @media (max-width: $breakpoints-mobile) {
          margin-bottom: 16px;
          font-size: 20px;
          font-weight: 400;
        }
      }

      p {
        margin: 0 0 76px;
        font-size: 20px;

        @media (max-width: $breakpoints-mobile) {
          margin: 0 0 54px;
          font-size: 12px;
          font-weight: 400;
        }
      }

      button {
        height: 53px;
        margin-top: 57px;
        font-size: 16px;
        font-weight: 700;
        color: $white;
        cursor: pointer;
        background-color: $primary-color;
        border-radius: 4px;

        @media (max-width: $breakpoints-mobile) {
          height: 32px;
          margin-top: 27px;
          font-size: 12px;
          font-weight: 400;
        }
      }
    }
  }
</style>
