import type { CartToServer } from '~/types/api'
import { useFetchApi } from '~/composables/api/useFetchApi'

export const useCartSync = () => {
  const { fetchApi } = useFetchApi()

  const syncCart = async (cart: CartToServer): Promise<void> => {
    await fetchApi<CartToServer>(`/carts/${cart.id}`, {
      method: 'PUT',
      body: {
        userId: cart.userId,
        date: new Date().toISOString(),
        products: cart.products,
      },
    })
  }

  return {
    syncCart,
  }
}
