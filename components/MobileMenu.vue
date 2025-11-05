<script setup lang="ts">
  import IconPerson from '~/assets/icons/Icon-person.svg'
  import IconExit from '~/assets/icons/Icon-exit.svg'
  import { APP_LINKS } from '~/constants/links'
  import IconCross from '~/assets/icons/Icon-cross.svg'

  const {
    CATALOGUE_LINK,
    BLOG_LINK,
    OUR_STORY_LINK,
    PROFILE_LINK,
    CONTACT_LINK,
    TERMS_LINK,
    SHIPPING_LINK,
  } = APP_LINKS

  interface Props {
    isMounted?: boolean
    isMobile: boolean
  }

  const { isMounted = false, isMobile } = defineProps<Props>()

  const emit = defineEmits<{
    linkClick: []
    closeClick: []
  }>()

  const handleLinkClick = () => {
    emit('linkClick')
  }

  const handleOverlayClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      //проверяем, что кликнули именно по серой зоне
      emit('closeClick')
    }
  }

  const handleCrossClick = () => {
    emit('closeClick')
  }

  const mainLinks = [
    { to: CATALOGUE_LINK, text: 'Shop' },
    { to: BLOG_LINK, text: 'Blog' },
    { to: OUR_STORY_LINK, text: 'Our Story' },
    { to: CONTACT_LINK, text: 'Contact' },
    { to: TERMS_LINK, text: 'Terms Of Services' },
    { to: SHIPPING_LINK, text: 'Shipping And Returns' },
  ]

  const profileLinks = [
    { to: PROFILE_LINK, text: 'My account', icon: IconPerson },
    { to: '', text: 'Logout', icon: IconExit },
  ]
</script>

<template>
  <div class="menu-overlay" @click="handleOverlayClick">
    <div class="menu">
      <div class="menu__header">
        <AppLogo />
        <IconCross class="menu__cross" @click="handleCrossClick" />
      </div>
      <MobileSearch :is-mobile="isMobile" :is-mounted="isMounted" />
      <nav class="menu__links">
        <NuxtLink
          v-for="link in mainLinks"
          :key="link.to"
          :to="link.to"
          class="menu__link"
          @click="handleLinkClick"
        >
          {{ link.text }}
        </NuxtLink>

        <hr class="menu__hr" />

        <NuxtLink
          v-for="link in profileLinks"
          :key="link.to"
          :to="link.to"
          class="menu__link"
          @click="handleLinkClick"
        >
          <component :is="link.icon" class="menu__icon" />
          <div>{{ link.text }}</div>
        </NuxtLink>
      </nav>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .menu-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgb(0 0 0 / 50%);
    animation: fade-in 0.3s ease-out forwards;
  }

  .menu {
    position: fixed;
    inset: 0 0 0 auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    padding: 16px;
    overflow-y: auto;
    background: white;
    transform: translateX(100%);
    animation: slide-in 0.4s ease-out forwards;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__links {
      display: flex;
      flex-direction: column;
      gap: 24px;
      margin-top: 24px;
    }

    &__link {
      position: relative;
      display: flex;
      align-items: center;
      padding: 0;
      color: inherit;
      text-decoration: none;
    }

    &__hr {
      width: 100%;
      margin: 0;
      border: none;
      border-top: 1px solid #d8d8d8;
    }

    &__icon {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      margin-right: 12px;
    }
  }

  @keyframes slide-in {
    from {
      transform: translateX(100%);
    }

    to {
      transform: translateX(0);
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @media (width <= 400px) {
    .menu {
      max-width: 100%;
    }
  }
</style>
