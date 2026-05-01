<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import BaseInput from '~/components/BaseInput.vue'
  import { useInput } from '~/composables/useInput'
  import { fieldValidators } from '~/utils/validation'
  import { useAuth } from '~/store/auth'
  import { useNotification } from '~/composables/notification/useNotification'

  const router = useRouter()
  const authStore = useAuth()
  const { showError, showSuccess } = useNotification()

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
  const isLoading = ref(false)

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

  const handleSubmit = async () => {
    if (!validateForm()) return

    isLoading.value = true

    try {
      const result = await authStore.login({
        username: userName.value,
        password: password.value,
      })

      if (result.success) {
        showSuccess('Вы успешно авторизовались')
        resetUserName()
        resetPass()
        router.push('/')
      } else {
        showError(result.error || 'Ошибка авторизации')
      }
    } catch (error) {
      showError('Произошла непредвиденная ошибка')
      console.error('Login error:', error)
    } finally {
      isLoading.value = false
    }
  }
</script>

<template>
  <div class="sign">
    <form @submit.prevent="handleSubmit">
      <BaseInput
        v-model="userName"
        :placeholder="'Username'"
        type="form"
        :error="userNameHasError"
        :error-message="userNameError"
        :disabled="isLoading"
      />
      <BaseInput
        v-model="password"
        :placeholder="'Password'"
        type="form"
        :error="passHasError"
        :error-message="passError"
        :disabled="isLoading"
      />
      <label>
        <input
          v-model="saveUserInfo"
          type="checkbox"
          :checked="saveUserInfo"
          :disabled="isLoading"
        />
        <span>Remember me</span>
      </label>

      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'LOADING...' : 'SIGN IN' }}
      </button>
      <NuxtLink to="resetPassword">Have you forgot your password?</NuxtLink>
    </form>
  </div>
</template>

<style lang="scss" scoped>
  .sign {
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

      a {
        margin-top: 20px;
        color: $primary-color;
        text-align: center;
        cursor: pointer;

        @media (max-width: $breakpoints-mobile) {
          font-size: 12px;
          font-weight: 400;
        }
      }
    }
  }
</style>
