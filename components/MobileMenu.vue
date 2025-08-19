<script setup lang="ts">
  import IconPerson from '~/assets/icons/Icon-person.svg'
  import IconExit from '~/assets/icons/Icon-exit.svg'
</script>

<template>
  <nav class="menu">
    <nuxt-link to="" class="menu__link">Shop</nuxt-link>
    <nuxt-link to="" class="menu__link">Blog</nuxt-link>
    <nuxt-link to="" class="menu__link">Our Story</nuxt-link>
    <nuxt-link to="" class="menu__link">Contact</nuxt-link>
    <nuxt-link to="" class="menu__link">Terms Of Services</nuxt-link>
    <nuxt-link to="" class="menu__link">Shipping And Returns</nuxt-link>
    <hr class="menu__hr" />
    <nuxt-link to="" class="menu__link">
      <IconPerson class="menu__icon" />
      <div>My account</div>
    </nuxt-link>
    <nuxt-link to="" class="menu__link">
      <IconExit class="menu__icon" />
      <div>Logout</div>
    </nuxt-link>
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
