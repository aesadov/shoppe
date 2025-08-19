<script setup lang="ts">
import IconPerson from "~/assets/icons/Icon-person.svg";
import IconExit from "~/assets/icons/Icon-exit.svg";
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
  top: 66px;
  left: 6px;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 1000;
  padding: 39px 20px;

  display: flex;
  flex-direction: column;
  font-size: 20px;
  margin: 39px 0 0 0;
  gap: 24px;

  &__link {
    display: flex;
    align-items: center;
    padding: 0;
    position: relative;
    text-decoration: none;
    color: inherit;
  }

  &__hr {
    margin: 0;
    border: none;
    border-top: 1px solid #d8d8d8;
    width: 100%;
  }

  &__icon {
    margin-right: 12px;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
}
</style>
