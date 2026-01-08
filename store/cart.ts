import { defineStore, skipHydrate } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { Product, Cart, CartItem } from '~/types/api'
import { useCartSync } from '~/composables/api/carts/useCartSync'
import { watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'

const START_QUANTITY = 1

export const useCartStore = defineStore('cart', () => {
  const isShowCart = ref(false)
  const cart = skipHydrate(
    useStorage<Cart>('shopCart', {
      id: 1,
      userId: 1,
      products: [],
    }),
  )

  const syncCartDebounced = useDebounceFn((cart: Cart) => {
    const productsToServer = cart.products.map((p) => ({
      productId: p.id,
      quantity: p.quantity,
    }))
    const cartToServer = { ...cart, products: productsToServer }
    syncCart(cartToServer)
  }, 300)

  watch(
    () => cart.value,
    (newCart) => {
      syncCartDebounced(newCart)
    },
    { deep: true },
  )

  const { syncCart } = useCartSync()

  const totalItems = computed(() =>
    cart.value.products.reduce((sum, item) => sum + item.quantity, 0),
  )

  const cartItems = computed<CartItem[]>(() => cart.value.products)

  const totalPrice = computed(() => {
    const total = cart.value.products.reduce((sum, cartItem) => {
      return cartItem.price * cartItem.quantity + sum
    }, 0)
    return Math.round(total * 100) / 100
  })

  function toggleSidebar() {
    isShowCart.value = !isShowCart.value
  }

  function addItem(product: Product) {
    const cartItem = cart.value.products.find((p) => p.id === product.id)
    if (cartItem) {
      cartItem.quantity++
    } else {
      cart.value.products.unshift({ ...product, quantity: START_QUANTITY })
    }
  }

  function removeItem(productId: number) {
    cart.value.products = cart.value.products.filter((p) => p.id !== productId)
  }

  function decreaseQuantity(productId: number) {
    const item = cart.value.products.find((p) => p.id === productId)
    if (item && item.quantity > 1) item.quantity--
  }

  function increaseQuantity(productId: number) {
    const item = cart.value.products.find((p) => p.id === productId)
    if (item) item.quantity++
  }

  return {
    isShowCart,
    cart,
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
