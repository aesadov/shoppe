<template>
  <NuxtLink class="logo" to="/" aria-label="Homepage">
    <span class="logo__initial">S</span>
    <span class="logo__accent">HOPPE</span>
  </NuxtLink>
</template>

<style lang="scss" scoped>
  .logo {
    display: flex;
    align-items: center;
    font-family: $logoFontFamily;
    font-size: 35px;
    font-weight: 400;
    text-decoration: none;

    @media (max-width: $breakpoints-mobile) {
      font-size: 25px;
    }

    &__initial {
      color: var(--logo-initial-color);
    }

    &__accent {
      color: var(--logo-accent-color);
    }
  }
</style>
