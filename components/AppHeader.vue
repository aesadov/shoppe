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
  const isMobile = ref(false) // Инициализируем как false

  // Используем onMounted  только для клиент-сайд кода
  onMounted(() => {
    isMounted.value = true
    // Проверяем медиазапрос только на клиенте
    const checkMobile = () => {
      isMobile.value = window.matchMedia(`(max-width: ${BREAKPOINTS.mobile})`).matches
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Чистим слушатель при уничтожении компонента
    onUnmounted(() => {
      window.removeEventListener('resize', checkMobile)
    })
  })

  const toggleMenu = () => {
    isShowMenu.value = !isShowMenu.value
  }

  const route = useRoute()

  const isHomePage = computed(() => route.path === '/')

  const isShopActive = computed(() => route.path.startsWith(CATALOGUE_LINK))
  const isBlogActive = computed(() => route.path.startsWith(BLOG_LINK))
  const isOurStoryActive = computed(() => route.path.startsWith(OUR_STORY_LINK))
  const isCartActive = computed(() => route.path.startsWith(CART_LINK))
  const isProfileActive = computed(() => route.path.startsWith(PROFILE_LINK))
</script>

<template>
  <div class="header-wrapper" :class="{ 'header-wrapper--bordered': !isHomePage }">
    <header class="header">
      <AppLogo />

      <!-- Рендерим обе версии, но управляем видимостью через CSS -->
      <nav class="header__nav" :class="{ 'header__nav--hidden': isMounted && isMobile }">
        <ul class="header__menu">
          <li class="header__menu-item" :class="{ 'header__menu-item--active': isShopActive }">
            <NuxtLink :to="CATALOGUE_LINK" class="header__menu-link">Shop</NuxtLink>
          </li>
          <li class="header__menu-item" :class="{ 'header__menu-item--active': isBlogActive }">
            <NuxtLink :to="BLOG_LINK" class="header__menu-link">Blog</NuxtLink>
          </li>
          <li class="header__menu-item" :class="{ 'header__menu-item--active': isOurStoryActive }">
            <NuxtLink :to="OUR_STORY_LINK" class="header__menu-link">Our Story</NuxtLink>
          </li>
        </ul>
        <div class="header__icons">
          <button class="header__icon-button" aria-label="Search">
            <IconMagnifyingGlass class="header__icon" />
          </button>
          <NuxtLink
            :to="CART_LINK"
            class="header__icon-button"
            :class="{ 'header__icon-button--active': isCartActive }"
          >
            <IconShoppingCart class="header__icon" />
          </NuxtLink>
          <NuxtLink
            :to="PROFILE_LINK"
            class="header__icon-button"
            :class="{ 'header__icon-button--active': isProfileActive }"
          >
            <IconPerson class="header__icon" />
          </NuxtLink>
        </div>
      </nav>

      <!-- Мобильные контролы -->
      <div
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
          <!-- <IconCross v-if="isShowMenu" class="header__mobile-icon" /> -->
        </button>
      </div>
    </header>
  </div>

  <MobileSearch :is-mobile="isMobile" :is-mounted="isMounted" />

  <MobileMenu
    v-if="isShowMenu && isMounted && isMobile"
    :is-mobile="isMobile"
    :is-mounted="isMounted"
    @link-click="toggleMenu"
    @close-click="toggleMenu"
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

    // Desktop Navigation
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
      list-style: none;

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

    &__menu-item {
      position: relative;

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
    }

    &__menu-link {
      color: inherit;
      text-decoration: none;
      cursor: pointer;
      transition: color 0.2s ease;

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

    // Mobile Elements
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
