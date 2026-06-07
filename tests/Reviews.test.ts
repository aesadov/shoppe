import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Reviews from '~/components/productCard/Reviews.vue'
import type { Product, Review } from '~/types/api'

// Мокаем дочерние компоненты — тестируем только Reviews, не их внутренности
vi.mock('~/components/productCard/ReviewsExamples.vue', () => ({
  default: {
    name: 'ReviewsExamples',
    props: ['title', 'reviews'],
    template: '<div class="reviews-examples">{{ title }} — {{ reviews.length }} reviews</div>',
  },
}))

vi.mock('~/components/productCard/AddReview.vue', () => ({
  default: {
    name: 'AddReview',
    props: ['productId'],
    template: '<div class="add-review">Add review for product {{ productId }}</div>',
  },
}))

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  description: 'Test description',
  category: 'test',
  image: 'test.jpg',
  rating: {
    rate: 4,
    count: 10,
  },
}

const mockReviews: Review[] = [
  {
    date: '6 may, 2020',
    name: 'Scarlett whithch',
    review: 'Lorem ipsum dolor sit amet.',
    rate: 3,
  },
  {
    date: '7 jul, 2025',
    name: 'Dmitry chel',
    review: 'Another review text.',
    rate: 4,
  },
]

describe('Reviews', () => {
  it('renders ReviewsExamples with correct props', () => {
    const wrapper = mount(Reviews, {
      props: {
        reviews: mockReviews,
        product: mockProduct,
      },
    })

    const examples = wrapper.find('.reviews-examples')
    expect(examples.exists()).toBe(true)
    expect(examples.text()).toContain('Test Product')
    expect(examples.text()).toContain('2 reviews')
  })

  it('renders AddReview with correct product id', () => {
    const wrapper = mount(Reviews, {
      props: {
        reviews: mockReviews,
        product: mockProduct,
      },
    })

    const addReview = wrapper.find('.add-review')
    expect(addReview.exists()).toBe(true)
    expect(addReview.text()).toBe('Add review for product 1')
  })

  it('passes all reviews to ReviewsExamples', () => {
    const wrapper = mount(Reviews, {
      props: {
        reviews: mockReviews,
        product: mockProduct,
      },
    })

    const examples = wrapper.findComponent({ name: 'ReviewsExamples' })
    expect(examples.props('reviews')).toEqual(mockReviews)
    expect(examples.props('reviews')).toHaveLength(2)
  })

  it('works with empty reviews array', () => {
    const wrapper = mount(Reviews, {
      props: {
        reviews: [],
        product: mockProduct,
      },
    })

    const examples = wrapper.find('.reviews-examples')
    expect(examples.exists()).toBe(true)
    expect(examples.text()).toContain('0 reviews')
  })
})
