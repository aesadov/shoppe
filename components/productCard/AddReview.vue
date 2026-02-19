<script setup lang="ts">
  import { ref, watch } from 'vue'
  import BaseInput from '~/components/BaseInput.vue'
  import { useInput } from '~/composables/useInput'
  import { useStorage } from '~/composables/useStorage'
  import { emailRegex } from '~/constants/regex'
  import { useNotification } from '~/composables/notification/useNotification'
  import { MAX_RATING } from '~/constants/rating'

  const props = defineProps<{
    productId: number
  }>()

  const { showSuccess } = useNotification()
  const { saveToStorage, getFromStorage, clearStorage } = useStorage()

  const {
    value: email,
    error: emailError,
    hasError: emailHasError,
    resetForm: resetEmail,
    validate: validateEmail,
  } = useInput({
    validation: (email) => {
      return emailRegex.test(email) || 'Please enter a valid email address'
    },
    required: true,
  })

  const {
    value: name,
    error: nameError,
    hasError: nameHasError,
    validate: validateName,
    resetForm: resetName,
  } = useInput({
    required: true,
  })

  const {
    value: review,
    error: reviewError,
    hasError: reviewHasError,
    validate: validateReview,
    resetForm: resetReview,
  } = useInput({
    required: true,
  })

  const rating = ref(0)
  const ratingErr = ref('')
  const saveUserInfo = ref(false)

  const loadSavedData = () => {
    const savedItems = getFromStorage('userInfo')
    if (savedItems.length > 0) {
      const lastSaved = savedItems[savedItems.length - 1]
      try {
        const { name: savedName, email: savedEmail } = JSON.parse(lastSaved.value)
        name.value = savedName || ''
        email.value = savedEmail || ''
      } catch (e) {
        console.error('Error loading saved data')
      }
    }
  }

  loadSavedData()

  const validateForm = () => {
    const isReviewValid = validateReview()
    const isNameValid = validateName()
    const isEmailValid = validateEmail()

    if (rating.value === 0) {
      ratingErr.value = 'Please select a rating'
      return false
    }

    return isReviewValid && isNameValid && isEmailValid
  }

  const saveReview = () => {
    const existingReviews = getFromStorage('reviews')
    const reviews = existingReviews.map((item) => JSON.parse(item.value))

    reviews.push({
      id: props.productId,
      review: review.value,
      name: name.value,
      email: email.value,
      rating: rating.value,
      date: new Date().toISOString(),
    })

    saveToStorage('reviews', JSON.stringify(reviews))

    if (saveUserInfo.value) {
      saveToStorage(
        'userInfo',
        JSON.stringify({
          name: name.value,
          email: email.value,
        }),
      )
    } else {
      clearStorage('userInfo')
    }
  }

  const handleSubmit = () => {
    if (validateForm()) {
      saveReview()

      resetEmail()
      resetName()
      resetReview()

      rating.value = 0
      ratingErr.value = ''
      saveUserInfo.value = false

      showSuccess('Review submitted successfully!')
    }
  }
</script>

<template>
  <div class="review">
    <h2>Add a Review</h2>
    <span class="review__instruction"
      >Your email address will not be published. Required fields are marked *</span
    >

    <form @submit.prevent="handleSubmit">
      <BaseInput
        v-model="review"
        type="form"
        :placeholder="'Your Review *'"
        :error="reviewHasError"
        :error-message="reviewError"
      />

      <BaseInput
        v-model="name"
        type="form"
        :placeholder="'Enter Your Name *'"
        :error="nameHasError"
        :error-message="nameError"
      />

      <BaseInput
        v-model="email"
        type="form"
        :placeholder="'Enter your Email *'"
        :error="emailHasError"
        :error-message="emailError"
      />

      <label class="review__checkbox">
        <input v-model="saveUserInfo" type="checkbox" :checked="saveUserInfo" />
        <span>Save my name, email, and website in this browser for the next time I comment</span>
      </label>

      <div class="rating">
        <span v-if="ratingErr" class="rating__error">{{ ratingErr }}</span
        ><span v-else class="rating__label">Your rating *</span>
        <div class="stars">
          <button v-for="star in MAX_RATING" :key="star" type="button" @click="rating = star">
            <span :class="{ active: star <= rating }">★</span>
          </button>
        </div>
      </div>

      <button class="submit-btn" type="submit">Submit</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
  .review {
    color: $main-text-color;

    h2 {
      margin-bottom: 11px;
      font-size: 20px;
      font-weight: 400;
      color: $primary-color;
    }

    &__instruction {
      font-size: 13px;
    }

    form {
      margin-top: 90px;

      @media (max-width: $breakpoints-mobile) {
        margin: 30px 0;
      }
    }

    &__checkbox {
      display: flex;
      margin-top: 6px;

      input {
        margin: 0 5px 0 0;
      }

      span {
        font-size: 12px;
      }
    }
  }

  .rating {
    margin-top: 40px;

    span {
      display: block;
      margin-bottom: 8px;
      font-size: 14px;
    }

    &__error {
      color: red;
    }

    &__label {
      color: $main-text-color;
    }
  }

  .stars {
    display: flex;
    gap: 5px;

    button {
      padding: 0 2px;
      font-size: 24px;
      cursor: pointer;
      background: none;
      border: none;

      span {
        font-size: 24px;
        color: #ddd;
        transition: color 0.2s;

        &.active {
          color: $primary-color;
        }
      }

      &:hover span {
        color: $primary-color;
      }
    }
  }

  .submit-btn {
    width: 123px;
    height: 53px;
    padding: 10px 30px;
    margin-top: 40px;
    font-size: 16px;
    font-weight: 700;
    color: white;
    cursor: pointer;
    background: $primary-color;
    border: none;
    border-radius: 4px;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }
</style>
