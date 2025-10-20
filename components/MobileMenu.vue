<script setup lang="ts">
  import IconPerson from '~/assets/icons/Icon-person.svg'
  import IconExit from '~/assets/icons/Icon-exit.svg'
  import { APP_LINKS } from '~/constants/links'

  const { CATALOGUE_LINK } = APP_LINKS
</script>

<template>
  <nav class="menu">
    <NuxtLink :to="CATALOGUE_LINK" class="menu__link">Shop</NuxtLink>
    <NuxtLink to="" class="menu__link">Blog</NuxtLink>
    <NuxtLink to="" class="menu__link">Our Story</NuxtLink>
    <NuxtLink to="" class="menu__link">Contact</NuxtLink>
    <NuxtLink to="" class="menu__link">Terms Of Services</NuxtLink>
    <NuxtLink to="" class="menu__link">Shipping And Returns</NuxtLink>
    <hr class="menu__hr" />
    <NuxtLink to="" class="menu__link">
      <IconPerson class="menu__icon" />
      <div>My account</div>
    </NuxtLink>
    <NuxtLink to="" class="menu__link">
      <IconExit class="menu__icon" />
      <div>Logout</div>
    </NuxtLink>
  </nav>
</template>

<style lang="scss" scoped>
  .menu {
    position: fixed;
    inset: 66px 0 0 6px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 39px 20px;
    margin: 39px 0 0;
    font-size: 20px;
    background: white;

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
</style>
