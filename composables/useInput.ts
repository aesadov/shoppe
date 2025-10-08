export const useInput = () => {
  const email = ref('')
  const isChecked = ref(false)
  const emailError = ref('')
  const hasError = ref(false)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const processSubmit = () => {
    emailError.value = ''
    hasError.value = false

    if (!isChecked.value) {
      emailError.value = 'Please agree to the terms and conditions'
      hasError.value = true
      return false
    }

    if (!email.value.trim()) {
      emailError.value = 'Email is required'
      hasError.value = true
      return false
    }

    if (!validateEmail(email.value)) {
      emailError.value = 'Please enter a valid email address'
      hasError.value = true
      return false
    }

    return true
  }

  const saveToStorage = () => {
    try {
      const savedEmails = JSON.parse(localStorage.getItem('newsletterEmails') || '[]')
      savedEmails.push({
        email: email.value,
        date: new Date().toISOString(),
      })
      localStorage.setItem('newsletterEmails', JSON.stringify(savedEmails))
      return true
    } catch (error) {
      console.error('Error saving email:', error)
      return false
    }
  }

  const resetForm = () => {
    email.value = ''
    isChecked.value = false
    emailError.value = ''
    hasError.value = false
  }

  return {
    email,
    isChecked,
    emailError,
    hasError,
    processSubmit,
    saveToStorage,
    resetForm,
  }
}
