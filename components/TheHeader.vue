<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";
import IconMagnifyingGlass from "~/assets/icons/Icon-magnifyingGlass.svg";
import IconShoppingCart from "~/assets/icons/Icon-shoppingCart.svg";
import IconPerson from "~/assets/icons/Icon-person.svg";
import IconBurgerMenu from "~/assets/icons/Icon-burgerMenu.svg";
import IconShoppingCartMobile from "~/assets/icons/Icon-shoppingCartMobile.svg";
import IconMagnifyingGlassMobile from "~/assets/icons/Icon-magnifyingGlass-mobile.svg";
import IconCross from "~/assets/icons/Icon-cross.svg";
import { BREAKPOINTS } from "~/constants/breakpoints";

const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.mobile})`);
const isShowMenu = ref(false);

const toggleMenu = () => {
  isShowMenu.value = !isShowMenu.value;
};
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
          <a class="header__menu-link">Shop</a>
        </li>
        <li class="header__menu-item">
          <a class="header__menu-link">Blog</a>
        </li>
        <li class="header__menu-item">
          <a class="header__menu-link">Our Story</a>
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
        @click="toggleMenu"
        :aria-label="isShowMenu ? 'Close menu' : 'Open menu'"
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

  height: 42px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 100;

  &__logo {
    font-family: $logoFontFamily;
    font-weight: 400;
    font-size: 35px;
    text-decoration: none;
    display: flex;
    align-items: center;

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
    list-style: none;
    padding: 0;
    margin: 0 96px 0 0;
    display: flex;
    gap: 64px;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      right: -48px;
      top: 10%;
      bottom: 10%;
      width: 2px;
      background: $main-text-color;
    }
  }

  &__menu-link {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s ease;
    cursor: pointer;

    &:hover {
      color: var(--link-hover-color);
    }
  }

  &__icons {
    display: flex;
    gap: 39px;
  }

  &__icon-button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  &__icon {
    width: var(--icon-size);
    height: var(--icon-size);
    display: block;
  }

  // Mobile Elements
  &__mobile-controls {
    display: flex;
    gap: 13px;
  }

  &__mobile-button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  &__mobile-icon {
    width: var(--mobile-icon-size);
    height: var(--mobile-icon-size);
    display: block;
  }

  &__search {
    width: calc(100% - 10px);
    background: #efefef;
    height: 32px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding-left: 10px;
    color: $main-text-color;
    font-size: 14px;
    margin-top: 8px;
  }

  &__search-icon {
    width: 16px;
    height: 16px;
  }
}
</style>
