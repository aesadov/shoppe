import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductGalery from '~/components/productCard/ProductGalery.vue'

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

vi.mock('~/components/skeletons/SkeletonImg.vue', () => ({
  default: {
    name: 'SkeletonImg',
    template: '<div class="skeleton-image">Loading...</div>',
  },
}))

const mockImages = [
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  'https://example.com/image3.jpg',
  'https://example.com/image4.jpg',
]

describe('ProductGalery', () => {
  it('shows skeleton loader when loading', () => {
    const wrapper = mount(ProductGalery, {
      props: {
        images: [],
        loading: true,
      },
    })

    expect(wrapper.find('.galery-sceleton').exists()).toBe(true)
    expect(wrapper.find('.skeleton-image').exists()).toBe(true)
    expect(wrapper.find('.galery').exists()).toBe(false)
  })

  it('renders images when loading is complete and images exist', () => {
    const wrapper = mount(ProductGalery, {
      props: {
        images: mockImages,
        loading: false,
      },
    })

    // Галерея отображается
    expect(wrapper.find('.galery').exists()).toBe(true)

    // Пользователь видит все миниатюры
    const thumbs = wrapper.findAll('.galery__thumb-img')
    expect(thumbs).toHaveLength(4)
    thumbs.forEach((thumb, i) => {
      expect(thumb.attributes('src')).toBe(mockImages[i])
      expect(thumb.attributes('alt')).toBe(`Thumb ${i + 1}`)
    })

    // Пользователь видит основные изображения
    const mainImages = wrapper.findAll('.galery__main-img')
    expect(mainImages).toHaveLength(4)
    mainImages.forEach((img, i) => {
      expect(img.attributes('src')).toBe(mockImages[i])
      expect(img.attributes('alt')).toBe(`Image ${i + 1}`)
    })
  })

  it('does not render gallery when there are no images', () => {
    const wrapper = mount(ProductGalery, {
      props: {
        images: [],
        loading: false,
      },
    })

    expect(wrapper.find('.galery').exists()).toBe(false)
    expect(wrapper.find('.galery-sceleton').exists()).toBe(false)
  })
})
