<!-- <template>
  <div class="review">
    <h2>Add а Review</h2>
    <span>Your email address will not be published. Required fields are marked *</span>
  </div>
</template>

<style lang="scss" scoped>
  .review {
    h2 {
      margin-bottom: 11px;
      font-size: 20px;
      font-weight: 400;
    }

    span {
      font-size: 13px;
      color: $main-text-color;
    }
  }
</style> -->

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import BaseInput from '~/components/BaseInput.vue'

  const review = ref('')
  const name = ref('')
  const email = ref('')
  const rating = ref(0)
  const saveInfo = ref(false)

  // Errors
  const reviewError = ref('')
  const nameError = ref('')
  const emailError = ref('')

  // Load saved data
  const loadSavedData = () => {
    const saved = localStorage.getItem('userInfo')
    if (saved) {
      try {
        const { name: savedName, email: savedEmail } = JSON.parse(saved)
        name.value = savedName || ''
        email.value = savedEmail || ''
      } catch (e) {
        console.error('Error loading saved data')
      }
    }
  }

  loadSavedData()

  // Validation
  const validateForm = () => {
    let isValid = true

    if (!review.value.trim()) {
      reviewError.value = 'Review is required'
      isValid = false
    } else {
      reviewError.value = ''
    }

    if (!name.value.trim()) {
      nameError.value = 'Name is required'
      isValid = false
    } else {
      nameError.value = ''
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.value.trim()) {
      emailError.value = 'Email is required'
      isValid = false
    } else if (!emailRegex.test(email.value)) {
      emailError.value = 'Invalid email format'
      isValid = false
    } else {
      emailError.value = ''
    }

    if (rating.value === 0) {
      alert('Please select a rating')
      isValid = false
    }

    return isValid
  }

  // Save review
  const saveReview = () => {
    const existingReviews = localStorage.getItem('reviews')
    const reviews = existingReviews ? JSON.parse(existingReviews) : []

    reviews.push({
      id: Date.now(),
      review: review.value,
      name: name.value,
      email: email.value,
      rating: rating.value,
      date: new Date().toISOString(),
    })

    localStorage.setItem('reviews', JSON.stringify(reviews))

    if (saveInfo.value) {
      localStorage.setItem(
        'userInfo',
        JSON.stringify({
          name: name.value,
          email: email.value,
        }),
      )
    } else {
      localStorage.removeItem('userInfo')
    }
  }

  // Handle submit
  const handleSubmit = () => {
    if (validateForm()) {
      saveReview()

      // Clear form
      review.value = ''
      name.value = ''
      email.value = ''
      rating.value = 0
      saveInfo.value = false

      alert('Review submitted successfully!')
    }
  }

  // Clear errors on input
  watch(review, () => {
    if (reviewError.value) reviewError.value = ''
  })

  watch(name, () => {
    if (nameError.value) nameError.value = ''
  })

  watch(email, () => {
    if (emailError.value) emailError.value = ''
  })
</script>

<template>
  <div class="review">
    <h2>Add a Review</h2>
    <span>Your email address will not be published. Required fields are marked *</span>

    <form>
      <BaseInput
        v-model="review"
        type="form"
        :placeholder="'Your Review *'"
        :error="!!reviewError"
        :error-message="reviewError"
      />

      <BaseInput
        v-model="name"
        type="form"
        :placeholder="'Enter Your Name *'"
        :error="!!nameError"
        :error-message="nameError"
      />

      <BaseInput
        v-model="email"
        type="form"
        :placeholder="'Enter your Email *'"
        :error="!!emailError"
        :error-message="emailError"
      />

      <div class="review__checkbox">
        <input :is-checked="saveInfo" type="checkbox" />
        <span>Save my name, email, and website in this browser for the next time I comment</span>
      </div>

      <div class="rating">
        <span>Your rating *</span>
        <div class="stars">
          <button v-for="star in 5" :key="star" type="button" @click="rating = star">
            <span :class="{ active: star <= rating }">★</span>
          </button>
        </div>
      </div>

      <button class="submit-btn" @click="handleSubmit">Submit</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
  .review {
    h2 {
      margin-bottom: 11px;
      font-size: 20px;
      font-weight: 400;
    }

    span {
      font-size: 13px;
      color: $main-text-color;
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
    }
  }

  .rating {
    margin-top: 40px;

    span {
      display: block;
      margin-bottom: 8px;
      font-size: 14px;
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
