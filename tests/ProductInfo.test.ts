import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ProductInfo from '~/components/productCard/ProductInfo.vue'
import type { Product } from '~/types/api'

vi.mock('~/assets/icons/Icon-twitter.svg', () => ({
  default: { name: 'IconTwitter', template: '<span class="icon-twitter">tw</span>' },
}))
vi.mock('~/assets/icons/Icon-Instagram.svg', () => ({
  default: { name: 'IconInstagram', template: '<span class="icon-instagram">ig</span>' },
}))
vi.mock('~/assets/icons/Icon-FB.svg', () => ({
  default: { name: 'IconFB', template: '<span class="icon-fb">fb</span>' },
}))
vi.mock('~/assets/icons/Icon-mail.svg', () => ({
  default: { name: 'IconMail', template: '<span class="icon-mail">mail</span>' },
}))
vi.mock('~/assets/icons/Icon-share.svg', () => ({
  default: { name: 'IconShare', template: '<span class="icon-share">share</span>' },
}))
vi.mock('~/assets/icons/icon-arrow-left_1.svg', () => ({
  default: { name: 'IconArrowLeft', template: '<span class="icon-arrow-left">←</span>' },
}))
vi.mock('~/assets/icons/icon-arrow-right.svg', () => ({
  default: { name: 'IconArrowRight', template: '<span class="icon-arrow-right">→</span>' },
}))

vi.mock('~/components/productCard/StarsRating.vue', () => ({
  default: {
    name: 'StarsRating',
    props: ['blackStars', 'whiteStars'],
    template: '<div class="stars-rating">{{ blackStars }} black / {{ whiteStars }} white</div>',
  },
}))

vi.mock('~/components/QuantityCounter.vue', () => ({
  default: {
    name: 'QuantityCounter',
    props: ['quantity', 'type'],
    emits: ['decrease', 'increase'],
    template: `
      <div class="quantity-counter">
        <button class="btn-decrease" @click="$emit('decrease')">–</button>
        <span class="quantity-value">{{ quantity }}</span>
        <button class="btn-increase" @click="$emit('increase')">+</button>
      </div>
    `,
  },
}))

vi.mock('~/components/skeletons/SkeletoneDescription.vue', () => ({
  default: {
    name: 'SkeletoneDescription',
    template: '<div class="skeleton-description">Loading description...</div>',
  },
}))

const showSuccessMock = vi.fn()
vi.mock('~/composables/notification/useNotification', () => ({
  useNotification: () => ({
    showSuccess: showSuccessMock,
  }),
}))

const addItemMock = vi.fn()
vi.mock('~/store/cart', () => ({
  useCartStore: () => ({
    addItem: addItemMock,
  }),
}))

const mockProduct: Product = {
  id: 1,
  title: 'Test Product Title',
  price: 99.99,
  description: 'This is a very long product description that should be truncated initially.',
  category: 'electronics',
  image: 'https://example.com/image.jpg',
  rating: {
    rate: 4.5,
    count: 42,
  },
}

const createWrapper = (product: Product, loading = false) => {
  return mount(ProductInfo, {
    props: {
      product,
      loading,
    },
    global: {
      plugins: [createPinia()],
    },
  })
}

describe('ProductInfo', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    addItemMock.mockClear()
    showSuccessMock.mockClear()
  })

  describe('loading state', () => {
    it('shows skeleton loader when loading', () => {
      const wrapper = createWrapper(mockProduct, true)

      expect(wrapper.find('.skeleton-description').exists()).toBe(true)
      expect(wrapper.find('h1').exists()).toBe(false)
    })
  })

  describe('product information', () => {
    it('displays product title', () => {
      const wrapper = createWrapper(mockProduct)

      expect(wrapper.find('h1').text()).toBe('Test Product Title')
    })

    it('displays product price', () => {
      const wrapper = createWrapper(mockProduct)

      expect(wrapper.find('.info__price p').text()).toBe('$ 99.99')
    })

    it('displays rating count text', () => {
      const wrapper = createWrapper(mockProduct)

      expect(wrapper.find('.info__raiting span').text()).toBe('42 customer review')
    })

    it('displays product description', () => {
      const wrapper = createWrapper(mockProduct)

      expect(wrapper.find('.info__description').text()).toBe(mockProduct.description)
    })

    it('displays SKU with product id', () => {
      const wrapper = createWrapper(mockProduct)

      const sku = wrapper.findAll('.info__meta-meaning')[0]
      expect(sku.text()).toBe('1')
    })

    it('displays category', () => {
      const wrapper = createWrapper(mockProduct)

      const category = wrapper.findAll('.info__meta-meaning')[1]
      expect(category.text()).toBe('electronics')
    })
  })

  describe('view more / view less', () => {
    it('shows "View more" button and collapses description by default', () => {
      const wrapper = createWrapper(mockProduct)

      expect(wrapper.find('.info__view span').text()).toBe('View more')
      expect(wrapper.find('.info__description--expanded').exists()).toBe(false)
    })

    it('expands description and shows "View less" after clicking "View more"', async () => {
      const wrapper = createWrapper(mockProduct)

      await wrapper.find('.info__view').trigger('click')

      expect(wrapper.find('.info__view span').text()).toBe('View less')
      expect(wrapper.find('.info__description--expanded').exists()).toBe(true)
    })

    it('collapses description back after clicking "View less"', async () => {
      const wrapper = createWrapper(mockProduct)

      await wrapper.find('.info__view').trigger('click')
      await wrapper.find('.info__view').trigger('click')

      expect(wrapper.find('.info__view span').text()).toBe('View more')
      expect(wrapper.find('.info__description--expanded').exists()).toBe(false)
    })
  })

  describe('quantity counter', () => {
    it('displays quantity counter with initial value 1', () => {
      const wrapper = createWrapper(mockProduct)

      expect(wrapper.find('.quantity-value').text()).toBe('1')
    })

    it('increases quantity on plus click', async () => {
      const wrapper = createWrapper(mockProduct)

      await wrapper.find('.btn-increase').trigger('click')

      expect(wrapper.find('.quantity-value').text()).toBe('2')
    })

    it('decreases quantity on minus click', async () => {
      const wrapper = createWrapper(mockProduct)

      await wrapper.find('.btn-increase').trigger('click') // 2
      await wrapper.find('.btn-decrease').trigger('click') // 1

      expect(wrapper.find('.quantity-value').text()).toBe('1')
    })

    it('does not decrease below 1', async () => {
      const wrapper = createWrapper(mockProduct)

      await wrapper.find('.btn-decrease').trigger('click')

      expect(wrapper.find('.quantity-value').text()).toBe('1')
    })
  })

  describe('add to cart', () => {
    it('calls addItem and showSuccess on "ADD TO CART" click', async () => {
      const wrapper = createWrapper(mockProduct)

      const buttons = wrapper.findAll('button')
      const addToCartBtn = buttons.find((btn) => btn.text().trim() === 'ADD TO CART')
      await addToCartBtn!.trigger('click')

      expect(addItemMock).toHaveBeenCalledWith(mockProduct, 1)
      expect(showSuccessMock).toHaveBeenCalledWith('The item was added to your Shopping bag', {
        link: 'VIEW CART',
      })
    })

    it('adds to cart with selected quantity', async () => {
      const wrapper = createWrapper(mockProduct)

      await wrapper.find('.btn-increase').trigger('click') // 2
      await wrapper.find('.btn-increase').trigger('click') // 3

      const buttons = wrapper.findAll('button')
      const addToCartBtn = buttons.find((btn) => btn.text().trim() === 'ADD TO CART')
      await addToCartBtn!.trigger('click')

      expect(addItemMock).toHaveBeenCalledWith(mockProduct, 3)
    })
  })

  describe('social icons', () => {
    it('displays all social icons', () => {
      const wrapper = createWrapper(mockProduct)

      expect(wrapper.find('.icon-mail').exists()).toBe(true)
      expect(wrapper.find('.icon-instagram').exists()).toBe(true)
      expect(wrapper.find('.icon-fb').exists()).toBe(true)
      expect(wrapper.find('.icon-twitter').exists()).toBe(true)
      expect(wrapper.find('.icon-share').exists()).toBe(true)
    })
  })

  describe('stars rating', () => {
    it('passes correct props to StarsRating', () => {
      const wrapper = createWrapper(mockProduct)

      const starsRating = wrapper.find('.stars-rating')
      expect(starsRating.text()).toBe('5 black / 0 white')
    })
  })
})
