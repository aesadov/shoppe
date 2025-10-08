<script setup lang="ts">
  import IconArrow from '~/assets/icons/Icon-arrow.svg'

  interface Props {
    error?: boolean
    placeholder?: string
    errorMessage?: string
    modelValue?: string
    isChecked?: boolean
  }

  const {
    error = false,
    placeholder = 'Введите текст',
    errorMessage = 'Ошибка ввода',
    modelValue = '',
    isChecked = false,
  } = defineProps<Props>()

  const emit = defineEmits<{
    'update:modelValue': [value: string]
    'update:isChecked': [value: boolean]
    submit: []
  }>()

  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.value)
  }

  const handleCheckboxChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('update:isChecked', target.checked)
  }

  const handleSubmit = () => {
    emit('submit')
  }
</script>

<template>
  <div class="input-container">
    <div class="error-msg">
      <span v-if="error">{{ errorMessage }}</span>
    </div>
    <div class="input-wrapper">
      <input
        class="input"
        :class="{ 'input--error': error }"
        :placeholder="placeholder"
        :value="modelValue"
        @input="handleInput"
        @keypress.enter="handleSubmit"
      />
      <IconArrow
        class="input__icon"
        :class="{ 'input__icon--disabled': !isChecked }"
        @click="handleSubmit"
      />
    </div>
    <div class="info">
      <input
        :checked="isChecked"
        class="info__checkbox"
        type="checkbox"
        @change="handleCheckboxChange"
      />
      <span class="info__agriment">i agree to the website's terms and conditions</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .input-container {
    position: relative;

    @media (max-width: $breakpoints-mobile) {
      width: 100%;
    }
  }

  .input-wrapper {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  .input {
    width: 100%;
    padding-bottom: 13px;
    outline: none;
    background: transparent;
    border: none;
    border-bottom: 2px solid $main-text-color;

    &::placeholder {
      color: $main-text-color;
      transition: color 0.2s ease;
    }

    &--error {
      border-bottom-color: red;
    }
  }

  .input__icon {
    position: absolute;
    top: 50%;
    right: 0;
    cursor: pointer;
    fill: $main-text-color;
    transform: translateY(-50%);
    transition: all 0.3s ease;

    &:hover {
      fill: #000;
    }

    &--disabled {
      pointer-events: none;
      cursor: not-allowed;
      fill: #ccc;
    }
  }

  .error-msg {
    height: 16px;
    margin-bottom: 4px;
    font-size: 12px;
    line-height: 1;
    color: red;

    // Когда нет текста — место сохраняется, но пустое
    span:empty {
      display: none;
    }
  }

  .info {
    display: flex;
    align-items: center;
    margin-top: 8px;

    @media (max-width: $breakpoints-mobile) {
      margin-top: 11px;
    }

    &__checkbox {
      margin-right: 8px;
    }

    &__agriment {
      font-size: 14px;
      color: #000;

      @media (max-width: $breakpoints-mobile) {
        font-size: 12px;
      }
    }
  }
</style>
