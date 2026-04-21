<script setup lang="ts">
  import { ref } from 'vue'
  import BaseInput from '~/components/BaseInput.vue'
  import { useInput } from '~/composables/useInput'
  import { fieldValidators } from '~/utils/validation'

  const {
    value: email,
    error: emailError,
    hasError: emailHasError,
    resetForm: resetEmail,
  } = useInput()
</script>

<template>
  <div class="password">
    <form>
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

      h1 {
        margin-bottom: 39px;
        font-size: 33px;
        font-weight: 500;
      }

      p {
        margin: 0 0 76px;
        font-size: 20px;
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
      }
    }
  }
</style>
