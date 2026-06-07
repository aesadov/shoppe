import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseTabs from '~/components/BaseTabs.vue'

const mockTabs = [
  { name: 'description', label: 'Description' },
  { name: 'additional', label: 'Additional information' },
  { name: 'reviews', label: 'Reviews' },
]

describe('BaseTabs', () => {
  it('renders all tab buttons with correct labels', () => {
    const wrapper = mount(BaseTabs, {
      props: {
        tabs: mockTabs,
        reviewsCount: 5,
      },
      slots: {
        description: '<div class="desc-content">Description content</div>',
        additional: '<div class="add-content">Additional content</div>',
        reviews: '<div class="rev-content">Reviews content</div>',
      },
    })

    const buttons = wrapper.findAll('.tabs__button')
    expect(buttons).toHaveLength(3)
    expect(buttons[0].text()).toBe('Description')
    expect(buttons[1].text()).toBe('Additional information')
    expect(buttons[2].text()).toContain('Reviews')
    expect(buttons[2].text()).toContain('(5)')
  })

  it('shows content of the first tab by default', () => {
    const wrapper = mount(BaseTabs, {
      props: {
        tabs: mockTabs,
        reviewsCount: 0,
      },
      slots: {
        description: '<div class="desc-content">Description content</div>',
        additional: '<div class="add-content">Additional content</div>',
        reviews: '<div class="rev-content">Reviews content</div>',
      },
    })

    // Первая кнопка активна
    const buttons = wrapper.findAll('.tabs__button')
    expect(buttons[0].classes()).toContain('tabs__button--active')

    // Контент первой вкладки виден
    expect(wrapper.find('.desc-content').exists()).toBe(true)
    expect(wrapper.find('.add-content').exists()).toBe(false)
    expect(wrapper.find('.rev-content').exists()).toBe(false)
  })

  it('switches content when clicking on another tab', async () => {
    const wrapper = mount(BaseTabs, {
      props: {
        tabs: mockTabs,
        reviewsCount: 0,
      },
      slots: {
        description: '<div class="desc-content">Description content</div>',
        additional: '<div class="add-content">Additional content</div>',
        reviews: '<div class="rev-content">Reviews content</div>',
      },
    })

    const buttons = wrapper.findAll('.tabs__button')

    // Кликаем на вторую вкладку
    await buttons[1].trigger('click')

    // Вторая кнопка стала активной
    expect(buttons[1].classes()).toContain('tabs__button--active')
    expect(buttons[0].classes()).not.toContain('tabs__button--active')

    // Контент второй вкладки виден
    expect(wrapper.find('.desc-content').exists()).toBe(false)
    expect(wrapper.find('.add-content').exists()).toBe(true)
    expect(wrapper.find('.rev-content').exists()).toBe(false)
  })

  it('shows initialTab if provided', () => {
    const wrapper = mount(BaseTabs, {
      props: {
        tabs: mockTabs,
        initialTab: 'reviews',
        reviewsCount: 3,
      },
      slots: {
        description: '<div class="desc-content">Description content</div>',
        additional: '<div class="add-content">Additional content</div>',
        reviews: '<div class="rev-content">Reviews content</div>',
      },
    })

    const buttons = wrapper.findAll('.tabs__button')
    expect(buttons[2].classes()).toContain('tabs__button--active')
    expect(wrapper.find('.rev-content').exists()).toBe(true)
  })
})
