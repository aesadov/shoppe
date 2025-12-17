import { defineStore } from 'pinia'
import type { Product, Cart, CartItem } from '~/types/api'

export const useCartStore = defineStore('cart', {
  state: (): {
    isShowCart: boolean
    cart: Cart
    products: Product[]
  } => ({
    isShowCart: false,
    cart: {
      id: 1,
      userId: 1,
      date: 'string',
      products: [],
      __v: 0,
    },
    products: [],
  }),

  getters: {
    totalItems(state) {
      return state.cart.products.reduce((sum, item) => sum + item.quantity, 0)
    },

    cartItems(state): CartItem[] {
      return state.cart.products
        .map((cartItem) => {
          const product = state.products.find((p) => p.id === cartItem.productId)
          if (!product) return null
          return { ...product, quantity: cartItem.quantity }
        })
        .filter((item): item is CartItem => item !== null)
    },

    totalPrice(state): number {
      const total = state.cart.products.reduce((sum, cartItem) => {
        const product = state.products.find((p) => p.id === cartItem.productId)
        return product ? sum + product.price * cartItem.quantity : sum
      }, 0)
      return Math.round(total * 100) / 100
    },
  },

  actions: {
    toggleSidebar() {
      this.isShowCart = !this.isShowCart
    },

    addItem(product: Product) {
      const cartItem = this.cart.products.find((p) => p.productId === product.id)
      if (cartItem) {
        cartItem.quantity++
      } else {
        this.cart.products.unshift({ productId: product.id, quantity: 1 })
        this.products.unshift(product)
      }
    },

    removeItem(productId: number) {
      this.cart.products = this.cart.products.filter((p) => p.productId !== productId)
      this.products = this.products.filter((p) => p.id !== productId)
    },

    decreaseQuantity(productId: number) {
      const item = this.cart.products.find((p) => p.productId === productId)
      if (!item) return
      if (item.quantity !== 1) {
        --item.quantity
      }
    },

    increaseQuantity(productId: number) {
      const item = this.cart.products.find((p) => p.productId === productId)
      if (!item) return
      ++item.quantity
    },
  },
})
