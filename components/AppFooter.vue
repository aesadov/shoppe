<script setup>
  import IconTwitter from '~/assets/icons/Icon-twitter.svg'
  import IconInstagram from '~/assets/icons/Icon-Instagram.svg'
  import IconFaceBook from '~/assets/icons/Icon-FB.svg'

  import { APP_LINKS } from '~/constants/links'
  import { useInput } from '~/composables/useInput'
  import { useNotification } from '~/composables/notification/useNotification'

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

  const {
    value: email,
    isChecked,
    error: emailError,
    hasError,
    approvedSubmit,
    resetForm,
    saveToStorage,
  } = useInput({
    validation: (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email) || 'Please enter a valid email address'
    },
    required: true,
    storageKey: 'newsletterEmails',
  })

  const { showSuccess } = useNotification()

  const handleSubmit = () => {
    if (approvedSubmit()) {
      if (saveToStorage()) {
        resetForm()
        showSuccess('The Email successfully sent')
      } else {
        emailError.value = 'Error saving email. Please try again.'
        hasError.value = true
      }
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
      <BaseInput
        v-model="email"
        v-model:is-checked="isChecked"
        :placeholder="PLACEHOLDER"
        :error="hasError"
        :error-message="emailError"
        @submit="handleSubmit"
      />
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
      margin-right: 20px;

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
