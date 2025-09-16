<script setup lang="ts">
  import { useNotification } from '~/composables/notification/useNotification'
  import IconDone from '~/assets/icons/Icon-done.svg'
  import IconError from '~/assets/icons/Icon-error.svg'
  import IconWarning from '~/assets/icons/Icon-warning.svg'
  import IconInfo from '~/assets/icons/Icon-info.svg'

  const { notifications, hideNotification } = useNotification()

  const iconMap = {
    success: IconDone,
    error: IconError,
    warning: IconWarning,
    info: IconInfo,
  }

  const getNotificationClass = (type: string) => {
    if (type === 'success') return ''
    return `notification--${type}`
  }
</script>

<template>
  <div class="notification-wrapper">
    <transition-group name="slide-down">
      <div v-for="n in notifications" :key="n.id" class="notification-container">
        <div class="notification" :class="getNotificationClass(n.type)">
          <div class="notification__message">
            <component :is="iconMap[n.type]" class="notification__message-icon" />
            <p class="notification__message-text">{{ n.message }}</p>
          </div>
          <button v-if="n.link" class="notification__link" @click="hideNotification(n.id)">
            {{ n.link }}
          </button>
          <button v-else class="notification__close" @click="hideNotification(n.id)">×</button>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<style lang="scss" scoped>
  .notification-wrapper {
    position: fixed;
    top: 24px;
    right: 0;
    left: 0;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    pointer-events: none;

    @media (max-width: $breakpoints-mobile) {
      top: 12px;
    }
  }

  .notification-container {
    box-sizing: border-box;
    width: 100%;
    max-width: 1440px;
    padding: 0 96px;
    margin-top: 8px;
    pointer-events: auto;

    @media (max-width: $breakpoints-mobile) {
      padding: 0 26px;
      margin-top: 4px;
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
      height: 100%;
    }

    @media (max-width: $breakpoints-mobile) {
      padding: 15px 16px 13px;
    }

    &.notification--error {
      color: #dc2626;
      background: #fef2f2;
      border: 1px solid #fecaca;
    }

    &.notification--warning {
      color: #d97706;
      background: #fffbeb;
      border: 1px solid #fde68a;
    }

    &.notification--info {
      color: #2563eb;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
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

      .notification--error & {
        color: #dc2626;
      }

      .notification--warning & {
        color: #d97706;
      }

      .notification--info & {
        color: #2563eb;
      }
    }

    &__close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      padding: 0;
      font-size: 20px;
      font-weight: bold;
      color: inherit;
      cursor: pointer;
      background: none;
      border: none;
      opacity: 0.7;
      transition: opacity 0.2s;

      &:hover {
        opacity: 1;
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
