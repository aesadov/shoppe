import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductsList from '~/components/productsList/ProductsList.vue'
import type { Product } from '~/types/api'

vi.mock('~/components/productsList/ProductCard.vue', () => ({
  default: {
    name: 'ProductCard',
    props: ['product', 'loading'],
    template: `
      <div :class="loading ? 'skeleton-card' : 'product-card'">
        <span v-if="!loading && product">{{ product.title }}</span>
      </div>
    `,
  },
}))

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Product 1',
    price: 10,
    description: '',
    category: 'cat',
    image: '/img1.jpg',
  },
  {
    id: 2,
    title: 'Product 2',
    price: 20,
    description: '',
    category: 'cat',
    image: '/img2.jpg',
  },
]

describe('ProductsList with type="similar"', () => {
  it('renders "Similar items" heading', () => {
    const wrapper = mount(ProductsList, {
      props: {
        type: 'similar',
        products: mockProducts,
        pending: false,
      },
    })

    expect(wrapper.find('.latest__title-similar').text()).toBe('Similar items')
  })

  it('applies horizontal scroll class for similar', () => {
    const wrapper = mount(ProductsList, {
      props: {
        type: 'similar',
        products: mockProducts,
        pending: false,
      },
    })

    expect(wrapper.find('.latest__products').classes()).toContain(
      'latest__products--horizontal-scroll',
    )
  })

  it('shows skeleton cards when pending is true', () => {
    const wrapper = mount(ProductsList, {
      props: {
        type: 'similar',
        products: mockProducts,
        pending: true,
      },
    })

    // Скелетоны есть в DOM
    const skeletonCards = wrapper.findAll('.skeleton-card')
    expect(skeletonCards.length).toBeGreaterThan(0)

    // Реальные карточки скрыты через v-show (проверяем атрибут style)
    const productCards = wrapper.findAll('.product-card')
    expect(productCards.length).toBeGreaterThan(0)
    productCards.forEach((card) => {
      expect(card.attributes('style')).toContain('display: none')
    })
  })

  it('renders real product cards when not pending and products exist', () => {
    const wrapper = mount(ProductsList, {
      props: {
        type: 'similar',
        products: mockProducts,
        pending: false,
      },
    })

    // Реальные карточки видны
    const productCards = wrapper.findAll('.product-card')
    expect(productCards).toHaveLength(2)

    // Проверяем названия продуктов
    const titles = productCards.map((card) => card.text())
    expect(titles).toContain('Product 1')
    expect(titles).toContain('Product 2')
  })

  it('does not show View All link for similar', () => {
    const wrapper = mount(ProductsList, {
      props: {
        type: 'similar',
        products: mockProducts,
        pending: false,
      },
    })

    expect(wrapper.find('.latest__link').exists()).toBe(false)
  })

  it('shows no product cards when products array is empty and not pending', () => {
    const wrapper = mount(ProductsList, {
      props: {
        type: 'similar',
        products: [],
        pending: false,
      },
    })

    const cards = wrapper.findAll('.product-card')
    expect(cards).toHaveLength(0)
  })
})
