import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseAccordeon from '~/components/BaseAccordeon.vue'

const mockItems = [
  { name: 'description', label: 'Description' },
  { name: 'additional', label: 'Additional information' },
  { name: 'reviews', label: 'Reviews' },
]

describe('BaseAccordeon', () => {
  it('renders all items with correct labels', () => {
    const wrapper = mount(BaseAccordeon, {
      props: {
        items: mockItems,
        reviewsCount: 5,
      },
      slots: {
        description: '<div class="desc-content">Description content</div>',
        additional: '<div class="add-content">Additional content</div>',
        reviews: '<div class="rev-content">Reviews content</div>',
      },
    })

    const items = wrapper.findAll('.accordeon__item')
    expect(items).toHaveLength(3)
    expect(items[0].text()).toContain('Description')
    expect(items[1].text()).toContain('Additional information')
    expect(items[2].text()).toContain('Reviews')
    expect(items[2].text()).toContain('(5)')
  })

  it('shows content when clicking on an item in single mode', async () => {
    const wrapper = mount(BaseAccordeon, {
      props: {
        items: mockItems,
        mode: 'single',
        reviewsCount: 0,
      },
      slots: {
        description: '<div class="desc-content">Description content</div>',
        additional: '<div class="add-content">Additional content</div>',
        reviews: '<div class="rev-content">Reviews content</div>',
      },
    })

    // Изначально все закрыты
    expect(wrapper.find('.desc-content').exists()).toBe(false)
    expect(wrapper.find('.add-content').exists()).toBe(false)

    // Кликаем на первый элемент
    await wrapper.findAll('.accordeon__header')[0].trigger('click')
    expect(wrapper.find('.desc-content').exists()).toBe(true)
    expect(wrapper.find('.accordeon__item--open').exists()).toBe(true)

    // Кликаем на второй — первый должен закрыться
    await wrapper.findAll('.accordeon__header')[1].trigger('click')
    expect(wrapper.find('.desc-content').exists()).toBe(false)
    expect(wrapper.find('.add-content').exists()).toBe(true)
    expect(wrapper.findAll('.accordeon__item--open')).toHaveLength(1)
  })

  it('closes item when clicking again', async () => {
    const wrapper = mount(BaseAccordeon, {
      props: {
        items: mockItems,
        mode: 'single',
        reviewsCount: 0,
      },
      slots: {
        description: '<div class="desc-content">Description content</div>',
        additional: '<div class="add-content">Additional content</div>',
        reviews: '<div class="rev-content">Reviews content</div>',
      },
    })

    const header = wrapper.findAll('.accordeon__header')[0]

    // Открываем
    await header.trigger('click')
    expect(wrapper.find('.desc-content').exists()).toBe(true)

    // Закрываем
    await header.trigger('click')
    expect(wrapper.find('.desc-content').exists()).toBe(false)
    expect(wrapper.find('.accordeon__item--open').exists()).toBe(false)
  })

  it('shows defaultOpen items initially', () => {
    const wrapper = mount(BaseAccordeon, {
      props: {
        items: mockItems,
        defaultOpen: ['additional'],
        reviewsCount: 0,
      },
      slots: {
        description: '<div class="desc-content">Description content</div>',
        additional: '<div class="add-content">Additional content</div>',
        reviews: '<div class="rev-content">Reviews content</div>',
      },
    })

    expect(wrapper.find('.desc-content').exists()).toBe(false)
    expect(wrapper.find('.add-content').exists()).toBe(true)
    expect(wrapper.find('.accordeon__item--open').text()).toContain('Additional information')
  })
})
