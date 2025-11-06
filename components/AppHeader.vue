<script setup lang="ts">
  import IconMagnifyingGlass from '~/assets/icons/Icon-magnifyingGlass.svg'
  import IconShoppingCart from '~/assets/icons/Icon-shoppingCart.svg'
  import IconPerson from '~/assets/icons/Icon-person.svg'
  import IconBurgerMenu from '~/assets/icons/Icon-burgerMenu.svg'
  import IconShoppingCartMobile from '~/assets/icons/Icon-shoppingCartMobile.svg'
  import { BREAKPOINTS } from '~/constants/breakpoints'
  import { APP_LINKS } from '~/constants/links'
  import { useRoute } from 'nuxt/app'

  const { CATALOGUE_LINK, BLOG_LINK, OUR_STORY_LINK, CART_LINK, PROFILE_LINK } = APP_LINKS

  const isShowMenu = ref(false)
  const isMounted = ref(false)
  const isMobile = ref(false)

  onMounted(() => {
    isMounted.value = true
    const checkMobile = () => {
      isMobile.value = window.matchMedia(`(max-width: ${BREAKPOINTS.mobile})`).matches
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    onUnmounted(() => {
      window.removeEventListener('resize', checkMobile)
    })
  })

  const toggleMenu = () => {
    isShowMenu.value = !isShowMenu.value
  }

  const closeMenu = () => {
    isShowMenu.value = false
  }

  const route = useRoute()
  const isHomePage = computed(() => route.path === '/')

  const isShopActive = computed(() => route.path.startsWith(CATALOGUE_LINK))
  const isBlogActive = computed(() => route.path.startsWith(BLOG_LINK))
  const isOurStoryActive = computed(() => route.path.startsWith(OUR_STORY_LINK))
  const isCartActive = computed(() => route.path.startsWith(CART_LINK))
  const isProfileActive = computed(() => route.path.startsWith(PROFILE_LINK))

  const navLinks = [
    { to: CATALOGUE_LINK, text: 'Shop', isActive: () => isShopActive.value },
    { to: BLOG_LINK, text: 'Blog', isActive: () => isBlogActive.value },
    { to: OUR_STORY_LINK, text: 'Our Story', isActive: () => isOurStoryActive.value },
  ]

  const iconLinks = [
    {
      to: CART_LINK,
      icon: IconShoppingCart,
      isActive: () => isCartActive.value,
      ariaLabel: 'Cart',
    },
    {
      to: PROFILE_LINK,
      icon: IconPerson,
      isActive: () => isProfileActive.value,
      ariaLabel: 'Profile',
    },
  ]
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
            :class="{ 'header__menu-link--active': link.isActive() }"
          >
            {{ link.text }}
          </NuxtLink>
        </div>
        <div class="header__icons">
          <button class="header__icon-button" aria-label="Search">
            <IconMagnifyingGlass class="header__icon" />
          </button>
          <NuxtLink
            v-for="iconLink in iconLinks"
            :key="iconLink.to"
            :to="iconLink.to"
            class="header__icon-button"
            :class="{ 'header__icon-button--active': iconLink.isActive() }"
            :aria-label="iconLink.ariaLabel"
          >
            <component :is="iconLink.icon" class="header__icon" />
          </NuxtLink>
        </div>
      </nav>

      <!-- Мобильная навигация -->
      <nav
        class="header__mobile-controls"
        :class="{ 'header__mobile-controls--hidden': isMounted && !isMobile }"
      >
        <NuxtLink :to="CART_LINK" class="header__mobile-button">
          <IconShoppingCartMobile class="header__mobile-icon" />
        </NuxtLink>
        <button
          class="header__mobile-button"
          :aria-label="isShowMenu ? 'Close menu' : 'Open menu'"
          @click="toggleMenu"
        >
          <IconBurgerMenu class="header__mobile-icon" />
        </button>
      </nav>
    </header>
  </div>

  <MobileSearch :is-mobile="isMobile" :is-mounted="isMounted" />

  <MobileMenu
    v-if="isShowMenu && isMounted && isMobile"
    :is-mobile="isMobile"
    :is-mounted="isMounted"
    @close="closeMenu"
  />
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
