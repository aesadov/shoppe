import ProductPage from '~/pages/products/[id].vue'
import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import type { Product } from '~/types/api'

const mockProduct: Product = {
  id: 1,
  title: 'Fjallraven Backpack',
  price: 109.95,
  description: 'Your perfect pack for everyday use',
  category: "men's clothing",
  image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  rating: {
    rate: 3.9,
    count: 120,
  },
}

const mockSimilarProducts: Product[] = [
  {
    id: 2,
    title: 'Mens Casual Premium Slim Fit T-Shirts',
    price: 22.3,
    description: 'Slim-fitting style',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    rating: {
      rate: 4.1,
      count: 259,
    },
  },
  {
    id: 3,
    title: 'Mens Cotton Jacket',
    price: 55.99,
    description: 'Great jacket',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    rating: {
      rate: 4.7,
      count: 500,
    },
  },
]

// Мокаем useRoute из nuxt/app
vi.mock('nuxt/app', async (importOriginal) => {
  const actual = await importOriginal<typeof import('nuxt/app')>()
  return {
    ...actual,
    useRoute: () => ({
      params: {
        id: '1',
      },
    }),
  }
})

// Мокаем API
vi.mock('~/composables/api/products/useGetProduct', () => ({
  useGetProduct: () => ({
    getProduct: vi.fn().mockResolvedValue(mockProduct),
  }),
}))

// Мокаем useGetAllProducts
vi.mock('~/composables/api/products/useGetAllProducts', () => ({
  useGetAllProducts: () => {
    const data = ref(mockSimilarProducts)
    const error = ref(null)
    const pending = ref(false)
    return { data, error, pending }
  },
}))

// Мокаем уведомления
vi.mock('~/composables/notification/useNotification', () => ({
  useNotification: () => ({
    showError: vi.fn(),
    showSuccess: vi.fn(),
  }),
}))

// Мокаем Swiper
vi.mock('swiper/vue', () => ({
  Swiper: {
    name: 'Swiper',
    template: '<div class="mock-swiper"><slot /></div>',
  },
  SwiperSlide: {
    name: 'SwiperSlide',
    template: '<div class="mock-swiper-slide"><slot /></div>',
  },
}))

// Мокаем иконки
vi.mock('~/assets/icons/icon-arrow-right.svg', () => ({
  default: {
    name: 'IconArrowRight',
    template: '<span class="icon-arrow-right">→</span>',
  },
}))

// Мокаем ProductCard для интеграционного теста
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

describe('Product detail page [id].vue', () => {
  const mountOptions = {
    global: {
      stubs: {
        NuxtLink: {
          template: '<a class="nuxt-link"><slot /></a>',
        },
        RouterLink: {
          template: '<a class="router-link"><slot /></a>',
        },
      },
    },
  }

  it('renders product title and price', async () => {
    const wrapper = mount(ProductPage, mountOptions)
    await flushPromises()

    expect(wrapper.find('h1').text()).toBe('Fjallraven Backpack')
    expect(wrapper.text()).toContain('$ 109.95')
  })

  it('renders product gallery with images', async () => {
    const wrapper = mount(ProductPage, mountOptions)
    await flushPromises()

    const mainImages = wrapper.findAll('.galery__main-img')
    expect(mainImages.length).toBeGreaterThan(0)
    expect(mainImages[0].attributes('src')).toBe(mockProduct.image)

    const thumbs = wrapper.findAll('.galery__thumb-img')
    expect(thumbs.length).toBeGreaterThan(0)
  })

  it('renders tabs and switches content', async () => {
    const wrapper = mount(ProductPage, mountOptions)
    await flushPromises()

    const tabs = wrapper.findAll('.tabs__button')
    expect(tabs).toHaveLength(3)
    expect(tabs[0].text()).toBe('Description')
    expect(tabs[1].text()).toBe('Additional information')
    expect(tabs[2].text()).toContain('Reviews')

    await tabs[1].trigger('click')
    const additionalContent = wrapper.find('.info')
    expect(additionalContent.exists()).toBe(true)
    expect(additionalContent.text()).toContain('Fjallraven Backpack')
    expect(additionalContent.text()).toContain('109.95')
    expect(additionalContent.text()).toContain("men's clothing")
  })

  it('renders "Similar items" section with product cards', async () => {
    const wrapper = mount(ProductPage, mountOptions)
    await flushPromises()

    expect(wrapper.find('.latest__title-similar').text()).toBe('Similar items')

    const productCards = wrapper.findAll('.product-card')
    expect(productCards.length).toBeGreaterThan(0)
  })

  it('renders "Continue shopping" link', async () => {
    const wrapper = mount(ProductPage, mountOptions)
    await flushPromises()

    const continueLink = wrapper.find('.product__continue')
    expect(continueLink.exists()).toBe(true)
    expect(continueLink.text()).toContain('Continue shopping')
  })
})
