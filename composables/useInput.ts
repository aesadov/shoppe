import { useStorage } from '~/composables/useStorage'

interface UseInputOptions {
  initialValue?: string
  initialChecked?: boolean
  validation?: (value: string) => boolean | string
  required?: boolean
  storageKey?: string
}

export const useInput = (options: UseInputOptions = {}) => {
  const {
    initialValue = '',
    initialChecked = false,
    validation,
    required = false,
    storageKey,
  } = options

  const value = ref(initialValue)
  const isChecked = ref(initialChecked)
  const error = ref('')
  const hasError = ref(false)

  const { saveToStorage } = useStorage()

  const validateValue = (inputValue: string) => {
    error.value = ''

    if (required && !inputValue.trim()) {
      error.value = 'This field is required'
      return false
    }

    if (validation) {
      const validationResult = validation(inputValue)

      if (typeof validationResult === 'string') {
        error.value = validationResult
        return false
      }

      if (validationResult === false) {
        error.value = 'Invalid value'
        return false
      }
    }

    return true
  }

  const approvedSubmit = () => {
    hasError.value = false

    if (!isChecked.value) {
      error.value = 'Please agree to the terms and conditions'
      hasError.value = true
      return false
    }

    if (!validateValue(value.value)) {
      hasError.value = true
      return false
    }

    return true
  }

  const saveToStorageWithKey = () => {
    if (!storageKey) {
      console.warn('No storage key provided')
      return false
    }
    return saveToStorage(storageKey, value.value)
  }

  const resetForm = () => {
    value.value = initialValue
    isChecked.value = initialChecked
    error.value = ''
    hasError.value = false
  }

  watch(value, (newValue) => {
    if (newValue && hasError.value) {
      validateValue(newValue)
    }
  })

  return {
    value,
    isChecked,
    error,
    hasError,
    approvedSubmit,
    saveToStorage: saveToStorageWithKey,
    resetForm,
    validate: () => validateValue(value.value),
  }
}
