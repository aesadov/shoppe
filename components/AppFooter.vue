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

  const errMessage = ref('')
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
      <BaseInput :error="inputErr" :placeholder="PLACEHOLDER" />
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
  }

  .divider {
    background-color: #d8d8d8;
  }

  .main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 37px;
    color: $main-text-color;

    &__nav {
      display: flex;
      gap: 41px;
      justify-content: space-between;
    }

    &__link {
      font-size: 16px;
      color: inherit; /* ← Наследует цвет от родителя */
      text-decoration: none; /* ← Убирает подчеркивание */
      cursor: pointer;

      &:hover {
        color: #000; /* ← Цвет при наведении */
      }
    }
  }

  .bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;

    &__icon {
      color: $main-text-color;
      cursor: pointer;

      &:hover {
        color: #000;
      }
    }

    &__social {
      display: flex;
      gap: 30px;
    }

    &__terms {
      font-size: 16px;
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
