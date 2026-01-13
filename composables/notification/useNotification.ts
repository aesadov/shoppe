import type { NotificationType, NotificationOptions } from '~/types/notification'
import { useNotificationStore } from '~/store/notification'
import { storeToRefs } from 'pinia'
import { useCartStore } from '~/store/cart'

let nextId = 0

export function useNotification() {
  const store = useNotificationStore()
  const { notifications } = storeToRefs(store)

  const generateId = () => ++nextId

  const { toggleSidebar } = useCartStore()

  const showNotification = (
    message: string,
    type: NotificationType = 'info',
    options: NotificationOptions = {},
  ) => {
    const id = options.id ?? generateId()

    const ERROR_DURATION = 8000
    const USUAL_DURATION = 5000
    const duration = options.duration ?? (type === 'error' ? ERROR_DURATION : USUAL_DURATION)

    store.show({
      id,
      message,
      type,
      link: options.link,
      LinkAdress: options.LinkAdress,
      icon: options.icon,
    })

    if (duration > 0) {
      setTimeout(() => {
        store.hide(id)
      }, duration)
    }

    return id
  }

  const hideNotification = (id: number) => {
    store.hide(id)
  }

  const showError = (message: string, options?: NotificationOptions) =>
    showNotification(message, 'error', options)

  const showSuccess = (message: string, options?: NotificationOptions) =>
    showNotification(message, 'success', options)

  const showWarning = (message: string, options?: NotificationOptions) =>
    showNotification(message, 'warning', options)

  const showInfo = (message: string, options?: NotificationOptions) =>
    showNotification(message, 'info', options)

  const handleLinkClick = (link: string) => {
    if (link === 'VIEW CART') {
      toggleSidebar()
      store.hideAll()
    }
  }

  return {
    handleLinkClick,
    notifications,
    showNotification,
    showError,
    showSuccess,
    showWarning,
    showInfo,
    hideNotification,
  }
}
