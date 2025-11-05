<!-- <script setup lang="ts">
  import IconPerson from '~/assets/icons/Icon-person.svg'
  import IconExit from '~/assets/icons/Icon-exit.svg'
  import { APP_LINKS } from '~/constants/links'
  import IconCross from '~/assets/icons/Icon-cross.svg'

  const {
    CATALOGUE_LINK,
    BLOG_LINK,
    OUR_STORY_LINK,
    PROFILE_LINK,
    CONTACT_LINK,
    TERMS_LINK,
    SHIPPING_LINK,
  } = APP_LINKS

  interface Props {
    isMounted?: boolean
    isMobile: boolean
  }

  const { isMounted = false, isMobile = false } = defineProps<Props>()

  const emit = defineEmits<{
    linkClick: []
    crossClick: []
  }>()

  const handleLinkClick = () => {
    emit('linkClick')
  }

  const handleCrossClick = () => {
    emit('crossClick')
  }
</script>

<template>
  <nav class="menu">
    <div class="menu__header">
      <AppLogo />
      <IconCross class="menu__cross" @click="handleCrossClick" />
    </div>
    <MobileSearch :is-mobile="isMobile" :is-mounted="isMounted" />
    <NuxtLink :to="CATALOGUE_LINK" class="menu__link" @click="handleLinkClick">Shop</NuxtLink>
    <NuxtLink :to="BLOG_LINK" class="menu__link" @click="handleLinkClick">Blog</NuxtLink>
    <NuxtLink :to="OUR_STORY_LINK" class="menu__link" @click="handleLinkClick">Our Story</NuxtLink>
    <NuxtLink :to="CONTACT_LINK" class="menu__link" @click="handleLinkClick">Contact</NuxtLink>
    <NuxtLink :to="TERMS_LINK" class="menu__link" @click="handleLinkClick"
      >Terms Of Services</NuxtLink
    >
    <NuxtLink :to="SHIPPING_LINK" class="menu__link" @click="handleLinkClick"
      >Shipping And Returns</NuxtLink
    >
    <hr class="menu__hr" />
    <NuxtLink :to="PROFILE_LINK" class="menu__link" @click="handleLinkClick">
      <IconPerson class="menu__icon" />
      <div>My account</div>
    </NuxtLink>
    <NuxtLink to="" class="menu__link" @click="handleLinkClick">
      <IconExit class="menu__icon" />
      <div>Logout</div>
    </NuxtLink>
  </nav>
</template>

<style lang="scss" scoped>
  .menu {
    position: fixed;
    inset: 66px 5px 0;
    z-index: 1000;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    padding: 39px 20px;
    margin: 39px 0 0;
    font-size: 20px;
    background: white;
    opacity: 0;
    animation: fade-in-up 0.4s ease-out forwards;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__link {
      position: relative;
      display: flex;
      align-items: center;
      padding: 0;
      color: inherit;
      text-decoration: none;
      opacity: 0;
      animation: fade-in 0.4s ease-out forwards;

      /* Задержки для ссылок через SCSS цикл */
      @for $i from 1 through 8 {
        &:nth-child(#{$i}) {
          animation-delay: 0.1s * $i;
        }
      }
    }

    &__hr {
      width: 100%;
      margin: 0;
      border: none;
      border-top: 1px solid #d8d8d8;
      opacity: 0;
      animation: fade-in 0.3s ease-out 0.8s forwards;
    }

    &__icon {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      margin-right: 12px;
    }
  }

  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
</style> -->

<script setup lang="ts">
  import IconPerson from '~/assets/icons/Icon-person.svg'
  import IconExit from '~/assets/icons/Icon-exit.svg'
  import { APP_LINKS } from '~/constants/links'
  import IconCross from '~/assets/icons/Icon-cross.svg'

  const {
    CATALOGUE_LINK,
    BLOG_LINK,
    OUR_STORY_LINK,
    PROFILE_LINK,
    CONTACT_LINK,
    TERMS_LINK,
    SHIPPING_LINK,
  } = APP_LINKS

  interface Props {
    isMounted?: boolean
    isMobile: boolean
  }

  const { isMounted = false, isMobile = false } = defineProps<Props>()

  const emit = defineEmits<{
    linkClick: []
    crossClick: []
  }>()

  const handleLinkClick = () => {
    emit('linkClick')
  }

  const handleCrossClick = () => {
    emit('crossClick')
  }
</script>

<template>
  <div class="menu-overlay">
    <div class="menu">
      <div class="menu__header">
        <AppLogo />
        <IconCross class="menu__cross" @click="handleCrossClick" />
      </div>
      <MobileSearch :is-mobile="isMobile" :is-mounted="isMounted" />
      <nav class="menu__links">
        <NuxtLink :to="CATALOGUE_LINK" class="menu__link" @click="handleLinkClick">Shop</NuxtLink>
        <NuxtLink :to="BLOG_LINK" class="menu__link" @click="handleLinkClick">Blog</NuxtLink>
        <NuxtLink :to="OUR_STORY_LINK" class="menu__link" @click="handleLinkClick"
          >Our Story</NuxtLink
        >
        <NuxtLink :to="CONTACT_LINK" class="menu__link" @click="handleLinkClick">Contact</NuxtLink>
        <NuxtLink :to="TERMS_LINK" class="menu__link" @click="handleLinkClick"
          >Terms Of Services</NuxtLink
        >
        <NuxtLink :to="SHIPPING_LINK" class="menu__link" @click="handleLinkClick"
          >Shipping And Returns</NuxtLink
        >
        <hr class="menu__hr" />
        <NuxtLink :to="PROFILE_LINK" class="menu__link" @click="handleLinkClick">
          <IconPerson class="menu__icon" />
          <div>My account</div>
        </NuxtLink>
        <NuxtLink to="" class="menu__link" @click="handleLinkClick">
          <IconExit class="menu__icon" />
          <div>Logout</div>
        </NuxtLink>
      </nav>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .menu-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgb(0 0 0 / 50%);
    animation: fade-in 0.3s ease-out forwards;
  }

  .menu {
    position: fixed;
    inset: 0 0 0 auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    padding: 16px;
    overflow-y: auto;
    background: white;
    transform: translateX(100%);
    animation: slide-in 0.4s ease-out forwards;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__links {
      display: flex;
      flex-direction: column;
      gap: 24px;
      margin-top: 24px;
    }

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

  @keyframes slide-in {
    from {
      transform: translateX(100%);
    }

    to {
      transform: translateX(0);
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @media (width <= 400px) {
    .menu {
      max-width: 100%;
    }
  }
</style>
