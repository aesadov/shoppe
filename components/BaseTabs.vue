<script setup lang="ts">
  import { useSlots } from 'vue'

  interface Tab {
    name: string
    label: string
  }

  const props = defineProps<{
    tabs: Tab[]
    initialTab?: string
    reviewsCount: number
  }>()

  const slots = useSlots()
  const activeTab = ref<string>(props.initialTab || props.tabs[0]?.name || '')

  const tabSlots = computed(() => {
    return props.tabs.filter((tab) => slots[tab.name])
  })
</script>

<template>
  <div class="tabs">
    <div class="tabs__header">
      <button
        v-for="tab in tabSlots"
        :key="tab.name"
        :class="['tabs__button', { 'tabs__button--active': activeTab === tab.name }]"
        @click="activeTab = tab.name"
      >
        <slot :name="`${tab.name}-label`" :tab="tab">
          {{ tab.label }} <span v-if="tab.name === 'reviews'">({{ reviewsCount }})</span></slot
        >
      </button>
    </div>

    <div class="tabs__content">
      <slot :name="activeTab" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .tabs {
    width: 100%;

    &__header {
      display: flex;
      gap: 96px;
      padding-bottom: 4px;
      margin-bottom: 55px;
      border-bottom: 1px solid $divider-color;
    }

    &__button {
      padding: 0;
      margin-bottom: 34px;
      font-size: 20px;
      font-weight: 400px;
      color: $main-text-color;
      cursor: pointer;
      background: transparent;
      border: none;
      transition: all 0.2s ease;

      &--active {
        position: relative;
        color: $primary-color;

        &::after {
          position: absolute;
          right: 0;
          bottom: -39px;
          left: 0;
          height: 1px;
          content: '';
          background: $primary-color;
        }
      }
    }

    &__content {
      min-height: 100px;
    }
  }
</style>
