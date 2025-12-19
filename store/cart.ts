import { defineStore, skipHydrate } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { Product, Cart, CartItem } from '~/types/api'

export const useCartStore = defineStore('cart', () => {
  const isShowCart = useStorage<boolean>('isShowCart', false)
  const START_QUANTITY = 1
  const CART_ID = 1
  const USER_ID = 1
  const VERSION = 0

  const cart = skipHydrate(
    useStorage<Cart>('shopCart', {
      id: CART_ID,
      userId: USER_ID,
      date: 'string',
      products: [],
      __v: VERSION,
    }),
  )

  const products = skipHydrate(useStorage<Product[]>('cart-products', []))

  const totalItems = computed(() =>
    cart.value.products.reduce((sum, item) => sum + item.quantity, 0),
  )

  const cartItems = computed<CartItem[]>(() =>
    cart.value.products
      .map((cartItem) => {
        const product = products.value.find((p) => p.id === cartItem.productId)
        if (!product) return null
        return { ...product, quantity: cartItem.quantity }
      })
      .filter((item): item is CartItem => item !== null),
  )

  const totalPrice = computed(() => {
    const total = cart.value.products.reduce((sum, cartItem) => {
      const product = products.value.find((p) => p.id === cartItem.productId)
      return product ? sum + product.price * cartItem.quantity : sum
    }, 0)
    return Math.round(total * 100) / 100
  })

  function toggleSidebar() {
    isShowCart.value = !isShowCart.value
  }

  function addItem(product: Product) {
    const cartItem = cart.value.products.find((p) => p.productId === product.id)
    if (cartItem) {
      cartItem.quantity++
    } else {
      cart.value.products.unshift({ productId: product.id, quantity: START_QUANTITY })
      products.value.unshift(product)
    }
  }

  function removeItem(productId: number) {
    cart.value.products = cart.value.products.filter((p) => p.productId !== productId)
    products.value = products.value.filter((p) => p.id !== productId)
  }

  function decreaseQuantity(productId: number) {
    const item = cart.value.products.find((p) => p.productId === productId)
    if (item && item.quantity > 1) item.quantity--
  }

  function increaseQuantity(productId: number) {
    const item = cart.value.products.find((p) => p.productId === productId)
    if (item) item.quantity++
  }

  return {
    isShowCart,
    cart,
    products,
    totalItems,
    cartItems,
    totalPrice,
    toggleSidebar,
    addItem,
    removeItem,
    decreaseQuantity,
    increaseQuantity,
  }
})
