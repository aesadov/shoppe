<script setup>
  import { ref } from 'vue'
  import IconTwitter from '~/assets/icons/Icon-twitter.svg'
  import IconInstagram from '~/assets/icons/Icon-Instagram.svg'
  import IconFaceBook from '~/assets/icons/Icon-FB.svg'

  import { APP_LINKS } from '~/constants/links'

  const {
    CONTACT_LINK,
    TERMS_LINK,
    SHIPPING_LINK,
    PRIVACY_POLICY,
    TWITTER_LINK,
    INSTAGRAM_LINK,
    FACEBOOK_LINK,
  } = APP_LINKS

  const PLACEHOLDER = 'Give an email, get the newsletter.'

  // Реактивные данные
  const email = ref('')
  const emailError = ref('')
  const hasError = ref(false) // Добавляем отдельный флаг для ошибки

  // Валидация email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Обработка отправки формы
  const handleSubmit = () => {
    // Сброс ошибки
    emailError.value = ''
    hasError.value = false

    // Валидация
    if (!email.value.trim()) {
      emailError.value = 'Email is required'
      hasError.value = true
      return
    }

    if (!validateEmail(email.value)) {
      emailError.value = 'Please enter a valid email address'
      hasError.value = true
      return
    }

    // Сохранение в localStorage
    try {
      // Получаем текущие emails из localStorage
      const savedEmails = JSON.parse(localStorage.getItem('newsletterEmails') || '[]')

      // Добавляем новый email (можно добавить проверку на дубликаты)
      savedEmails.push({
        email: email.value,
        date: new Date().toISOString(),
      })

      // Сохраняем обратно в localStorage
      localStorage.setItem('newsletterEmails', JSON.stringify(savedEmails))

      // Очищаем поле после успешного сохранения
      email.value = ''

      // Можно добавить уведомление об успехе
      console.log('Email successfully saved to localStorage')
    } catch (error) {
      console.error('Error saving email to localStorage:', error)
      emailError.value = 'Error saving email. Please try again.'
      hasError.value = true
    }
  }
</script>

<template>
  <footer class="footer">
    <hr class="divider" />
    <div class="main">
      <nav class="main__nav">
        <NuxtLink class="main__link" :to="CONTACT_LINK">CONTACT</NuxtLink>
        <NuxtLink class="main__link" :to="TERMS_LINK">TERMS OF SERVICES</NuxtLink>
        <NuxtLink class="main__link" :to="SHIPPING_LINK">SHIPPING AND RETURNS</NuxtLink>
      </nav>
      <!-- Форма для email -->
      <form class="email-form" @submit.prevent="handleSubmit">
        <BaseInput
          v-model="email"
          :placeholder="PLACEHOLDER"
          :error="hasError"
          :errorMessage="emailError"
        />
      </form>
    </div>
    <div class="bottom">
      <div class="bottom__terms">
        © 2021 Shelly.
        <NuxtLink class="bottom__terms-link" :to="TERMS_LINK">Terms of use </NuxtLink>and
        <NuxtLink class="bottom__terms-link" :to="PRIVACY_POLICY">privacy policy.</NuxtLink>
      </div>
      <div class="bottom__social">
        <a :href="TWITTER_LINK" target="_blank"><IconTwitter class="bottom__icon" /></a>
        <a :href="INSTAGRAM_LINK" target="_blank"><IconInstagram class="bottom__icon" /></a>
        <a :href="FACEBOOK_LINK" target="_blank"><IconFaceBook class="bottom__icon" /></a>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
  .footer {
    margin-top: 253px;

    @media (max-width: $breakpoints-mobile) {
      margin-top: 94px;
    }
  }

  .divider {
    background-color: #d8d8d8;

    @media (max-width: $breakpoints-mobile) {
      display: none;
    }
  }

  .main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 37px;
    color: $main-text-color;

    @media (max-width: $breakpoints-mobile) {
      flex-direction: column-reverse;
      align-items: flex-start;
    }

    &__nav {
      display: flex;
      gap: 41px;
      justify-content: space-between;

      @media (max-width: $breakpoints-mobile) {
        flex-direction: column;
        gap: 8px;
        margin-top: 40px;
      }
    }

    &__link {
      font-size: 16px;
      color: inherit;
      text-decoration: none;
      cursor: pointer;

      &:hover {
        color: #000;
      }

      @media (max-width: $breakpoints-mobile) {
        font-size: 12px;
      }
    }
  }

  .bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;

    @media (max-width: $breakpoints-mobile) {
      flex-direction: column-reverse;
      align-items: flex-start;
      margin-top: 32px;
    }

    &__icon {
      width: auto;
      height: 19px;
      color: $main-text-color;
      cursor: pointer;

      @media (max-width: $breakpoints-mobile) {
        width: auto;
        height: 12px;
      }

      &:hover {
        color: #000;
      }
    }

    &__social {
      display: flex;
      gap: 30px;

      @media (max-width: $breakpoints-mobile) {
        gap: 16px;
      }
    }

    &__terms {
      font-size: 16px;

      @media (max-width: $breakpoints-mobile) {
        margin-top: 36px;
        font-size: 12px;
      }
    }

    &__terms-link {
      color: $main-text-color;
      cursor: pointer;

      &:hover {
        color: #000;
      }
    }
  }
</style>
