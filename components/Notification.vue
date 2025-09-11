<script setup lang="ts">
  import { useNotification } from '~/composables/notification/useNotification'
  import IconDone from '~/assets/icons/Icon-done.svg'

  const { notifications, hideNotification } = useNotification()
</script>

<template>
  <div class="notification-wrapper">
    <transition-group name="slide-down">
      <div v-for="n in notifications" :key="n.id" class="notification-container">
        <div class="notification">
          <div class="notification__message">
            <IconDone class="notification__message-icon" />
            <p class="notification__message-text">{{ n.message }}</p>
          </div>
          <NuxtLink v-if="n.link" class="notification__link" @click.native="hideNotification(n.id)">
            {{ n.link }}
          </NuxtLink>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<style lang="scss" scoped>
  .notification-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    pointer-events: none;
  }

  .notification-container {
    box-sizing: border-box;
    width: 100%;
    max-width: 1440px;
    padding: 0 96px;
    pointer-events: auto;

    @media (max-width: $breakpoints-mobile) {
      padding: 0 26px;
    }
  }

  .notification {
    box-sizing: border-box;
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 68px;
    padding: 16px 39px;
    background: #efefef;
    border-radius: 4px;

    @media (max-width: $breakpoints-mobile) {
      align-items: flex-start;
    }

    @media (max-width: $breakpoints-mobile) {
      padding: 15px 16px 13px;
    }

    &__message {
      display: flex;
      flex: 1;
      gap: 16px;
      align-items: center;

      @media (max-width: $breakpoints-mobile) {
        gap: 8px;
        align-items: flex-start;
      }
    }

    &__message-text {
      margin: 0;
      font-size: 16px;
      font-weight: 400;

      @media (max-width: $breakpoints-mobile) {
        font-size: 12px;
        line-height: 20px;
      }
    }

    &__message-icon {
      flex-shrink: 0;
      width: 20px !important;
      min-width: 20px;
      height: 20px !important;

      :deep(svg) {
        width: 100%;
        height: 100%;
      }

      @media (max-width: $breakpoints-mobile) {
        width: 16px !important;
        min-width: 16px;
        height: 16px !important;
      }
    }

    &__link {
      font-size: 16px;
      font-weight: 700;
      color: $accent-color;
      white-space: nowrap;
      cursor: pointer;
      background: none;
      border: none;

      @media (max-width: $breakpoints-mobile) {
        font-size: 12px;
        font-weight: 400;
      }
    }
  }

  /* Анимация */
  .slide-down-enter-active,
  .slide-down-leave-active {
    transition: all 0.4s ease;
  }

  .slide-down-enter-from {
    opacity: 0;
    transform: translateY(-100%);
  }

  .slide-down-enter-to {
    opacity: 1;
    transform: translateY(0);
  }

  .slide-down-leave-from {
    opacity: 1;
    transform: translateY(0);
  }

  .slide-down-leave-to {
    opacity: 0;
    transform: translateY(-100%);
  }
</style>
