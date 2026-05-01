import { emailRegex } from '~/constants/regex'

export interface ValidationResult {
  isValid: boolean
  error: string
}

export const validators = {
  required: (value: string, fieldName = 'This field'): ValidationResult => {
    const isValid = value.trim() !== ''
    return {
      isValid,
      error: isValid ? '' : `${fieldName} is required`,
    }
  },

  email: (value: string): ValidationResult => {
    if (!value.trim()) {
      return { isValid: false, error: 'Please enter your e-mail' }
    }
    const isValid = emailRegex.test(value)
    return {
      isValid,
      error: isValid ? '' : 'Please enter a valid email address',
    }
  },

  minLength: (value: string, min: number, fieldName = 'Field'): ValidationResult => {
    const isValid = value.length >= min
    return {
      isValid,
      error: isValid ? '' : `${fieldName} must be at least ${min} characters`,
    }
  },

  maxLength: (value: string, max: number, fieldName = 'Field'): ValidationResult => {
    const isValid = value.length <= max
    return {
      isValid,
      error: isValid ? '' : `${fieldName} must be no more than ${max} characters`,
    }
  },

  rating: (value: number): ValidationResult => {
    const isValid = value > 0
    return {
      isValid,
      error: isValid ? '' : 'Please select a rating',
    }
  },
}

export const fieldValidators = {
  review: (value: string): ValidationResult => {
    return validators.required(value, 'Review')
  },

  name: (value: string): ValidationResult => {
    return validators.required(value, 'Name')
  },

  email: (value: string): ValidationResult => {
    return validators.email(value)
  },

  username: (value: string): ValidationResult => {
    const required = validators.required(value, 'Username')
    if (!required.isValid) return required

    return validators.minLength(value, 3, 'Username')
  },

  password: (value: string): ValidationResult => {
    const required = validators.required(value, 'Password')
    if (!required.isValid) return required

    return validators.minLength(value, 6, 'Password')
  },
}
