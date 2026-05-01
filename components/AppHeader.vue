<script setup lang="ts">
  import IconMagnifyingGlass from '~/assets/icons/Icon-magnifyingGlass.svg'
  import IconShoppingCart from '~/assets/icons/Icon-shoppingCart.svg'
  import IconPerson from '~/assets/icons/Icon-person.svg'
  import IconBurgerMenu from '~/assets/icons/Icon-burgerMenu.svg'
  import IconShoppingCartMobile from '~/assets/icons/Icon-shoppingCartMobile.svg'
  import { BREAKPOINTS } from '~/constants/breakpoints'
  import { APP_LINKS } from '~/constants/links'
  import { useRoute } from 'nuxt/app'
  import { useCartStore } from '~/store/cart'
  import { navigateTo } from 'nuxt/app'
  import { useMediaQuery } from '@vueuse/core'
  import type { Icon } from '@/types/icon'
  import { useAuth } from '~/store/auth'
  import { useNotification } from '~/composables/notification/useNotification'

  const { CATALOGUE_LINK, BLOG_LINK, OUR_STORY_LINK, ACCOUNT_LINK } = APP_LINKS

  const isShowMenu = ref(false)
  const isMounted = ref(false)

  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.mobile})`)
  const { toggleSidebar } = useCartStore()
  const authStore = useAuth()
  const { showSuccess } = useNotification()

  const toggleMenu = () => {
    isShowMenu.value = !isShowMenu.value
  }

  const closeMenu = () => {
    isShowMenu.value = false
  }

  const route = useRoute()
  const isHomePage = computed(() => route.path === '/')

  const handleProfileClick = () => {
    if (authStore.isAuthenticated) {
      authStore.logout()
      showSuccess('You have been logged out', {
        duration: 5000,
      })
    } else {
      navigateTo(ACCOUNT_LINK)
    }
  }

  const navLinks = [
    { to: CATALOGUE_LINK, text: 'Shop' },
    { to: BLOG_LINK, text: 'Blog' },
    { to: OUR_STORY_LINK, text: 'Our Story' },
  ]

  const desktopIcons: Icon[] = [
    {
      icon: IconMagnifyingGlass,
      ariaLabel: 'MagnifyingGlass',
    },
    {
      icon: IconShoppingCart,
      ariaLabel: 'Cart',
      click: toggleSidebar,
    },
    {
      to: ACCOUNT_LINK,
      icon: IconPerson,
      ariaLabel: 'Profile',
      click: handleProfileClick,
    },
  ]

  const mibileIcons: Icon[] = [
    {
      icon: IconShoppingCartMobile,
      ariaLabel: 'Cart',
      click: toggleSidebar,
    },
    {
      icon: IconBurgerMenu,
      ariaLabel: 'BurgerMenu',
      click: toggleMenu,
    },
  ]

  onMounted(() => {
    authStore.initAuth()
    isMounted.value = true
  })
</script>

<template>
  <div class="header-wrapper" :class="{ 'header-wrapper--bordered': !isHomePage }">
    <header class="header">
      <AppLogo />

      <!-- Десктопная навигация -->
      <nav class="header__nav" :class="{ 'header__nav--hidden': isMounted && isMobile }">
        <div class="header__menu">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="header__menu-link"
            :class="{ 'header__menu-link--active': route.path.startsWith(link.to) }"
          >
            {{ link.text }}
          </NuxtLink>
        </div>
        <div class="header__icons">
          <button
            v-for="icon in desktopIcons"
            :key="icon.ariaLabel"
            class="header__icon-button"
            :class="{
              'header__icon-button--active': icon.to && route.path.startsWith(icon.to),
              'header__icon-button--authenticated':
                icon.ariaLabel === 'Profile' && authStore.isAuthenticated,
            }"
            :aria-label="icon.ariaLabel"
            @click="icon.click"
          >
            <component :is="icon.icon" class="header__icon" />

            <span
              v-if="icon.ariaLabel === 'Profile' && authStore.isAuthenticated"
              class="header__auth-indicator"
            />
          </button>
        </div>
      </nav>

      <!-- Мобильная навигация -->
      <nav
        class="header__mobile-controls"
        :class="{ 'header__mobile-controls--hidden': isMounted && !isMobile }"
      >
        <button
          v-for="icon in mibileIcons"
          :key="icon.ariaLabel"
          class="header__mobile-button"
          :aria-label="icon.ariaLabel"
          @click="icon.click"
        >
          <component :is="icon.icon" class="header__mobile-icon" />
        </button>
      </nav>
    </header>
  </div>

  <MobileSearch :is-mobile="isMobile" :is-mounted="isMounted" />

  <ClientOnly>
    <MobileMenu :is-show-menu="isShowMenu" :is-mobile="isMobile" @close="closeMenu" />
  </ClientOnly>
</template>

<style lang="scss" scoped>
  .header-wrapper {
    &--bordered {
      @media (width >= calc(#{$breakpoints-mobile} + 1px)) {
        margin-bottom: 96px;
        border-bottom: 2px solid $divider-color;
      }
    }
  }

  .header {
    --icon-size: 24px;
    --mobile-icon-size: 20px;
    --link-hover-color: #{$accent-color};

    position: relative;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;

    @media (max-width: $breakpoints-mobile) {
      margin-bottom: 0;
    }

    &__nav {
      display: flex;
      align-items: center;

      &--hidden {
        display: none !important;
      }

      @media (max-width: $breakpoints-mobile) {
        display: none;
      }
    }

    &__menu {
      position: relative;
      display: flex;
      gap: 64px;
      padding: 0;
      margin: 0 96px 0 0;

      &::after {
        position: absolute;
        top: 10%;
        right: -48px;
        bottom: 10%;
        width: 2px;
        content: '';
        background: $main-text-color;
      }

      @media (max-width: $breakpoints-mobile) {
        display: none;
      }
    }

    &__menu-link {
      position: relative;
      color: inherit;
      text-decoration: none;
      cursor: pointer;
      transition: color 0.2s ease;

      &::after {
        position: absolute;
        bottom: -28px;
        left: 50%;
        width: 0;
        height: 2px;
        content: '';
        background: $primary-color;
        transform: translateX(-50%);
        transition: all 0.3s ease;
      }

      &--active::after {
        width: 100%;
      }

      &:hover {
        color: var(--link-hover-color);
      }
    }

    &__icons {
      display: flex;
      gap: 39px;

      @media (max-width: $breakpoints-mobile) {
        display: none;
      }
    }

    &__icon-button {
      position: relative;
      padding: 0;
      cursor: pointer;
      background: none;
      border: none;

      &::after {
        position: absolute;
        bottom: -26px;
        left: 50%;
        width: 0;
        height: 2px;
        content: '';
        background: $primary-color;
        transform: translateX(-50%);
        transition: all 0.3s ease;
      }

      &.header__icon-button--active::after {
        width: 100%;
      }
    }

    &__icon {
      display: block;
      width: var(--icon-size);
      height: var(--icon-size);
      color: $primary-color;
      transition: fill 0.2s ease;

      &:hover {
        color: $accent-color;
      }
    }

    &__auth-indicator {
      position: absolute;
      top: -2px;
      left: -2px;
      width: 8px;
      height: 8px;
      background-color: #22c55e;
      border-radius: 50%;
    }

    &__mobile-controls {
      display: none;
      gap: 13px;

      &--hidden {
        display: none !important;
      }

      @media (max-width: $breakpoints-mobile) {
        display: flex;
      }
    }

    &__mobile-button {
      padding: 0;
      cursor: pointer;
      background: none;
      border: none;
    }

    &__mobile-icon {
      display: block;
      width: var(--mobile-icon-size);
      height: var(--mobile-icon-size);
    }
  }
</style>
