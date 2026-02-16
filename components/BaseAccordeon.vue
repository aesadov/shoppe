<script setup lang="ts">
  import IconArrowDown from '~/assets/icons/icon-arrow-down.svg'
  import { useSlots, ref } from 'vue'

  type AccordeonItem = {
    name: string
    label: string
  }

  type AccordeonMode = 'multiple' | 'single' | 'none'

  const props = withDefaults(
    defineProps<{
      items: AccordeonItem[]
      mode?: AccordeonMode
      defaultOpen?: string[]
      reviewsCount: number
    }>(),
    {
      mode: 'single',
      defaultOpen: () => [],
    },
  )

  const slots = useSlots()
  const openItems = ref<Set<string>>(new Set(props.defaultOpen))

  const toggleItem = (itemName: string) => {
    if (props.mode === 'none') return

    if (props.mode === 'single') {
      openItems.value = openItems.value.has(itemName) ? new Set() : new Set([itemName])
    } else {
      const newSet = new Set(openItems.value)
      newSet.has(itemName) ? newSet.delete(itemName) : newSet.add(itemName)
      openItems.value = newSet
    }
  }

  const isItemOpen = (itemName: string) => {
    return props.mode !== 'none' && openItems.value.has(itemName)
  }
</script>

<template>
  <div class="accordeon">
    <div
      v-for="item in items.filter((item) => slots[item.name])"
      :key="item.name"
      :class="['accordeon__item', { 'accordeon__item--open': isItemOpen(item.name) }]"
    >
      <button class="accordeon__header" @click="toggleItem(item.name)">
        <div class="accordeon__header-content">
          <slot :name="`${item.name}-label`" :item="item">
            {{ item.label }} <span v-if="item.name === 'reviews'">({{ reviewsCount }})</span>
          </slot>
        </div>
        <span v-if="mode !== 'none'" class="accordeon__arrow">
          <slot name="arrow-icon">
            <IconArrowDown />
          </slot>
        </span>
      </button>

      <Transition name="accordeon-slide">
        <div v-if="isItemOpen(item.name)">
          <slot :name="item.name" :item="item" />
        </div>
      </Transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .accordeon {
    width: 100%;

    &__arrow {
      margin-left: 12px;
      color: inherit;
      transition: transform 0.3s ease;
    }

    &__item--open &__arrow {
      transform: rotate(180deg);
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 12px 0;
      text-align: left;
      cursor: pointer;
      background: transparent;
      border: none;
      transition: all 0.2s ease;
    }

    &__header-content {
      flex: 1;
      font-size: 16px;
      font-weight: 500;
    }
  }

  .accordeon-slide-enter-active,
  .accordeon-slide-leave-active {
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .accordeon-slide-enter-from,
  .accordeon-slide-leave-to {
    max-height: 0;
    opacity: 0;
    transform: translateY(-10px);
  }
</style>
