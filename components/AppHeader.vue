<script setup lang="ts">
  import IconMagnifyingGlass from '~/assets/icons/Icon-magnifyingGlass.svg'
  import IconShoppingCart from '~/assets/icons/Icon-shoppingCart.svg'
  import IconPerson from '~/assets/icons/Icon-person.svg'
  import IconBurgerMenu from '~/assets/icons/Icon-burgerMenu.svg'
  import IconShoppingCartMobile from '~/assets/icons/Icon-shoppingCartMobile.svg'
  import IconMagnifyingGlassMobile from '~/assets/icons/Icon-magnifyingGlass-mobile.svg'
  import IconCross from '~/assets/icons/Icon-cross.svg'
  import { BREAKPOINTS } from '~/constants/breakpoints'
  import { APP_LINKS } from '~/constants/links'

  const { CATALOGUE_LINK } = APP_LINKS

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
</script>

<template>
  <header class="header">
    <NuxtLink class="header__logo" to="/" aria-label="Homepage">
      <span class="header__logo-initial">S</span>
      <span class="header__logo-accent">HOPPE</span>
    </NuxtLink>

    <!-- Рендерим обе версии, но управляем видимостью через CSS -->
    <nav class="header__nav" :class="{ 'header__nav--hidden': isMounted && isMobile }">
      <ul class="header__menu">
        <li class="header__menu-item">
          <NuxtLink :to="CATALOGUE_LINK" class="header__menu-link">Shop</NuxtLink>
        </li>
        <li class="header__menu-item">
          <NuxtLink to="" class="header__menu-link">Blog</NuxtLink>
        </li>
        <li class="header__menu-item">
          <NuxtLink to="" class="header__menu-link">Our Story</NuxtLink>
        </li>
      </ul>
      <div class="header__icons">
        <button class="header__icon-button" aria-label="Search">
          <IconMagnifyingGlass class="header__icon" />
        </button>
        <button class="header__icon-button" aria-label="Cart">
          <IconShoppingCart class="header__icon" />
        </button>
        <button class="header__icon-button" aria-label="Account">
          <IconPerson class="header__icon" />
        </button>
      </div>
    </nav>

    <!-- Мобильные контролы -->
    <div
      class="header__mobile-controls"
      :class="{ 'header__mobile-controls--hidden': isMounted && !isMobile }"
    >
      <button class="header__mobile-button" aria-label="Cart">
        <IconShoppingCartMobile class="header__mobile-icon" />
      </button>
      <button
        class="header__mobile-button"
        :aria-label="isShowMenu ? 'Close menu' : 'Open menu'"
        @click="toggleMenu"
      >
        <IconBurgerMenu v-if="!isShowMenu" class="header__mobile-icon" />
        <IconCross v-if="isShowMenu" class="header__mobile-icon" />
      </button>
    </div>
  </header>

  <!-- Мобильный поиск -->
  <div class="header__search" :class="{ 'header__search--hidden': isMounted && !isMobile }">
    <IconMagnifyingGlassMobile class="header__search-icon" />
    <span class="header__search-text">Search</span>
  </div>

  <!-- Мобильное меню -->
  <MobileMenu
    v-if="isShowMenu && isMounted && isMobile"
    @link-click="toggleMenu"
    @close="toggleMenu"
  />
</template>

<style lang="scss" scoped>
  .header {
    --icon-size: 24px;
    --mobile-icon-size: 20px;
    --logo-initial-color: #{$accent-color};
    --logo-accent-color: #{$primary-color};
    --link-hover-color: #{$accent-color};

    position: relative;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 42px;
    margin-bottom: 16px;

    @media (max-width: $breakpoints-mobile) {
      margin-bottom: 0;
    }

    &__logo {
      display: flex;
      align-items: center;
      font-family: $logoFontFamily;
      font-size: 35px;
      font-weight: 400;
      text-decoration: none;

      @media (max-width: $breakpoints-mobile) {
        font-size: 25px;
      }
    }

    &__logo-initial {
      color: var(--logo-initial-color);
    }

    &__logo-accent {
      color: var(--logo-accent-color);
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
      padding: 0;
      cursor: pointer;
      background: none;
      border: none;
    }

    &__icon {
      display: block;
      width: var(--icon-size);
      height: var(--icon-size);
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

    &__search {
      display: none;
      gap: 8px;
      align-items: center;
      width: calc(100% - 10px);
      height: 32px;
      padding-left: 10px;
      margin: 8px 0 16px;
      font-size: 14px;
      color: $main-text-color;
      background: #efefef;
      border-radius: 4px;

      &--hidden {
        display: none !important;
      }

      @media (max-width: $breakpoints-mobile) {
        display: flex;
      }
    }

    &__search-icon {
      width: 16px;
      height: 16px;
    }
  }
</style>
