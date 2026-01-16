<script setup lang="ts">
  import IconArrowLeft from '~/assets/icons/icon-arrow-left.svg'

  interface Props {
    isMobile: boolean
    totalItems: number
  }

  const { isMobile, totalItems } = defineProps<Props>()

  const emit = defineEmits<{
    close: []
  }>()

  const handleClose = () => {
    emit('close')
  }
</script>

<template>
  <div class="header">
    <div class="header__top" :class="{ 'header__top--mobile': isMobile }">
      <IconArrowLeft v-if="isMobile" class="header__icon" @click="handleClose" />
      <h1 class="header__title" :class="{ 'header__title--mobile': isMobile }">Shopping bag</h1>
    </div>
    <div class="header__count">{{ totalItems }} items</div>
  </div>
</template>

<style lang="scss" scoped>
  .header {
    &__top {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;

      &--mobile {
        margin-bottom: 25px;
      }
    }

    &__title {
      justify-self: center;
      margin-bottom: 17px;
      font-size: 16px;
      font-weight: 400;

      &--mobile {
        margin-bottom: 0;
      }
    }

    &__icon {
      width: 9px;
      height: 16px;
      cursor: pointer;
    }

    &__count {
      margin-bottom: 7px;
      font-size: 12px;
      color: $main-text-color;
    }
  }
</style>
