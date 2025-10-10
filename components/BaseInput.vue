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

  const checkboxId = 'agreement-checkbox'
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
      <div
        class="input__icon-wrapper"
        :class="{ 'input__icon-wrapper--disabled': !isChecked }"
        @click="handleSubmit"
      >
        <IconArrow class="input__icon" />
      </div>
    </div>
    <div class="info">
      <input
        :id="checkboxId"
        :checked="isChecked"
        class="info__checkbox"
        type="checkbox"
        @change="handleCheckboxChange"
      />
      <label :for="checkboxId" class="info__agriment"
        >i agree to the website's terms and conditions</label
      >
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
    fill: $main-text-color;
    transition: all 0.3s ease;
  }

  .input__icon-wrapper {
    position: absolute;
    top: 50%;
    right: 0;
    padding: 15px;
    margin: -15px;
    cursor: pointer;
    transform: translateY(-30%);

    &--disabled {
      pointer-events: none;
      cursor: not-allowed;

      .input__icon {
        fill: #ccc;
      }
    }
  }

  .input__icon-wrapper:hover .input__icon {
    fill: #000;
  }

  .error-msg {
    height: 16px;
    margin-bottom: 4px;
    font-size: 12px;
    line-height: 1;
    color: red;

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
