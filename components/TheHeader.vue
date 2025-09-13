<script setup lang="ts">
  import { useMediaQuery } from '@vueuse/core'
  import IconMagnifyingGlass from '~/assets/icons/Icon-magnifyingGlass.svg'
  import IconShoppingCart from '~/assets/icons/Icon-shoppingCart.svg'
  import IconPerson from '~/assets/icons/Icon-person.svg'
  import IconBurgerMenu from '~/assets/icons/Icon-burgerMenu.svg'
  import IconShoppingCartMobile from '~/assets/icons/Icon-shoppingCartMobile.svg'
  import IconMagnifyingGlassMobile from '~/assets/icons/Icon-magnifyingGlass-mobile.svg'
  import IconCross from '~/assets/icons/Icon-cross.svg'
  import { BREAKPOINTS } from '~/constants/breakpoints'

  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.mobile})`)
  const isShowMenu = ref(false)

  const toggleMenu = () => {
    isShowMenu.value = !isShowMenu.value
  }
</script>

<template>
  <header class="header">
    <a class="header__logo" href="/" aria-label="Homepage">
      <span class="header__logo-initial">S</span>
      <span class="header__logo-accent">HOPPE</span>
    </a>

    <!-- Desktop Navigation -->
    <nav v-if="!isMobile" class="header__nav">
      <ul class="header__menu">
        <li class="header__menu-item">
          <nuxt-link to="" class="header__menu-link">Shop</nuxt-link>
        </li>
        <li class="header__menu-item">
          <nuxt-link to="" class="header__menu-link">Blog</nuxt-link>
        </li>
        <li class="header__menu-item">
          <nuxt-link to="" class="header__menu-link">Our Story</nuxt-link>
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

    <!-- Mobile Controls -->
    <div v-if="isMobile" class="header__mobile-controls">
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

  <!-- Mobile Search -->
  <div v-if="isMobile" class="header__search">
    <IconMagnifyingGlassMobile class="header__search-icon" />
    <span class="header__search-text">Search</span>
  </div>

  <!-- Mobile Menu -->
  <MobileMenu v-if="isShowMenu" @close="toggleMenu" />
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
      display: flex;
      gap: 13px;
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
      display: flex;
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
    }

    &__search-icon {
      width: 16px;
      height: 16px;
    }
  }
</style>
