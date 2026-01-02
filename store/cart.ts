import { defineStore, skipHydrate } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { Product, Cart, CartItem } from '~/types/api'
import { useCartSync } from '~/composables/api/carts/useCartSync'
import { watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'

const START_QUANTITY = 1

export const useCartStore = defineStore('cart', () => {
  const isShowCart = useStorage<boolean>('isShowCart', false)
  const cart = skipHydrate(
    useStorage<Cart>('shopCart', {
      id: 1,
      userId: 1,
      date: new Date().toISOString(),
      products: [],
      __v: 0,
    }),
  )

  const syncCartDebounced = useDebounceFn((cart: Cart) => {
    syncCart(cart)
  }, 300)

  watch(
    () => cart.value,
    (newCart) => {
      syncCartDebounced(newCart)
    },
    { deep: true },
  )

  const products = skipHydrate(useStorage<Product[]>('cart-products', []))
  const { syncCart } = useCartSync()

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
