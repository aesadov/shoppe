import type { Cart } from '~/types/api'
import { useFetchApi } from '~/composables/api/useFetchApi'

export const useCartSync = () => {
  const { fetchApi } = useFetchApi()

  const syncCart = async (cart: Cart): Promise<void> => {
    await fetchApi<Cart>(`/carts/${cart.id}`, {
      method: 'PUT',
      body: {
        userId: cart.userId,
        date: cart.date || new Date().toISOString(),
        products: cart.products,
      },
    })
  }

  return {
    syncCart,
  }
}
