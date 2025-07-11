<script setup>
    import { useMediaQuery } from '@vueuse/core'
    import IconMagnifyingGlass from '~/assets/icons/Icon-magnifyingGlass.svg'
    import IconShoppingCart from '~/assets/icons/Icon-shoppingCart.svg'
    import IconPerson from '~/assets/icons/Icon-person.svg'
    import IconBurgerMenu from '~/assets/icons/Icon-burgerMenu.svg'
    import IconShoppingCartMobile from '~/assets/icons/Icon-shoppingCartMobile.svg'

    const isMobile = useMediaQuery(`(max-width: 1440px)`)
</script>

<template>
    <div class=header>
        <a class='header-logo' href='/'>
            <span>S</span>
            <span class='header-logo__accent'>HOPPE</span>
        </a>
        <nav v-if='!isMobile' class='header-navigation'>
            <ul class='header-navigation__menu'>
                <li><a>Shop</a></li>
                <li><a>Blog</a></li>
                <li><a>Our Story</a></li>
            </ul>
            <div class='header-navigation__icons'>
                <IconMagnifyingGlass/>
                <IconShoppingCart/>
                <IconPerson/>
            </div>
        </nav>
        <nav v-else>
          <IconShoppingCartMobile/>
          <IconBurgerMenu/>
        </nav>
    </div>
    <div v-if='isMobile' class='header-mobileSearch'>
      Search
    </div>
</template>

<style lang='scss' scoped>
    .header {
        height: 42px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .header-logo {
        font-family: $logoFontFamily;
        font-weight: 400;
        color: $accent-color;
        font-size: 35px;

        &__accent {
            color: $primary-color
        }

        @media (max-width: $breakpoints-xxl) {
          font-size: 25px;
        }
    }

    .header-navigation {
        display: flex;
        align-items: center;

        &__menu {
          list-style-type: none;
          padding-left: 0;
          display: flex;
          position: relative;
          margin-right: 96px;
          height: 100%;
          gap: 64px;
          
          &::after { 
            content: "";
            position: absolute;
            right: -48px;
            top: 10%;
            bottom: 10%;
            width: 2px;
            background-color: $main-text-color;
            display: block;
          }
        }

        &__icons {
          display: flex;
          gap: 39px; 
        }

        a, &__icons svg {
          cursor: pointer;
        }
    }
    .header-mobileSearch {
      width: 100%;
      background-color: #EFEFEF;
      height: 32px;
      border-radius: 4px;
    }
</style>