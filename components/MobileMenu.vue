<script setup lang="ts">
  import IconPerson from '~/assets/icons/Icon-person.svg'
  import IconExit from '~/assets/icons/Icon-exit.svg'
  import { APP_LINKS } from '~/constants/links'
  import MobileSearch from '~/components/MobileSearch.vue'
  import IconCross from '~/assets/icons/Icon-cross.svg'
  import AppLogo from '~/components/AppLogo.vue'

  const {
    CATALOGUE_LINK,
    BLOG_LINK,
    OUR_STORY_LINK,
    ACCOUNT_LINK,
    CONTACT_LINK,
    TERMS_LINK,
    SHIPPING_LINK,
  } = APP_LINKS

  interface Props {
    isMounted?: boolean
    isMobile: boolean
    isShowMenu: boolean
  }

  const { isMounted = false, isMobile, isShowMenu } = defineProps<Props>()

  const mainLinks = [
    { to: CATALOGUE_LINK, text: 'Shop' },
    { to: BLOG_LINK, text: 'Blog' },
    { to: OUR_STORY_LINK, text: 'Our Story' },
    { to: CONTACT_LINK, text: 'Contact' },
    { to: TERMS_LINK, text: 'Terms Of Services' },
    { to: SHIPPING_LINK, text: 'Shipping And Returns' },
  ]

  const profileLinks = [
    { to: ACCOUNT_LINK, text: 'My account', icon: IconPerson },
    { to: '', text: 'Logout', icon: IconExit },
  ]
</script>

<template>
  <ModalSidebar :is-visible="isShowMenu">
    <template #default="{ close }">
      <div class="menu__header">
        <AppLogo />
        <IconCross @click="close" />
      </div>

      <MobileSearch :is-mobile="isMobile" :is-mounted="isMounted" />

      <nav class="menu-links">
        <NuxtLink
          v-for="link in mainLinks"
          :key="link.to"
          :to="link.to"
          class="menu-link"
          @click="close"
        >
          {{ link.text }}
        </NuxtLink>

        <hr class="menu-hr" />

        <NuxtLink
          v-for="link in profileLinks"
          :key="link.to"
          :to="link.to"
          class="menu-link"
          @click="close"
        >
          <component :is="link.icon" class="menu-icon" />
          <div>{{ link.text }}</div>
        </NuxtLink>
      </nav>
    </template>
  </ModalSidebar>
</template>

<style lang="scss" scoped>
  .menu__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .menu-links {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 24px;
  }

  .menu-link {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0;
    color: inherit;
    text-decoration: none;
  }

  .menu-hr {
    width: 100%;
    margin: 0;
    border: none;
    border-top: 1px solid $divider-color;
  }

  .menu-icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    margin-right: 12px;
  }
</style>
