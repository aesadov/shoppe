import { ref } from 'vue'
import type { Notification, NotificationType, NotificationOptions } from '~/types/notification'

const notifications = ref<Notification[]>([])
let nextId = 0

export function useNotification() {
  const generateId = () => ++nextId

  const showNotification = (
    message: string,
    type: NotificationType = 'info',
    options: NotificationOptions = {},
  ) => {
    const id = options.id ?? generateId()
    const ERROR_DURATION = 8000
    const USUAL_DURATION = 5000
    const duration = options.duration ?? (type === 'error' ? ERROR_DURATION : USUAL_DURATION)

    notifications.value.push({
      id,
      message,
      type,
      link: options.link,
      LinkAdress: options.LinkAdress,
      duration,
      icon: options.icon,
    })

    if (duration > 0) {
      setTimeout(() => {
        hideNotification(id)
      }, duration)
    }

    return id
  }

  const showError = (message: string, options?: NotificationOptions) => {
    return showNotification(message, 'error', options)
  }

  const showSuccess = (message: string, options?: NotificationOptions) => {
    return showNotification(message, 'success', options)
  }

  const showWarning = (message: string, options?: NotificationOptions) => {
    return showNotification(message, 'warning', options)
  }

  const showInfo = (message: string, options?: NotificationOptions) => {
    return showNotification(message, 'info', options)
  }

  const hideNotification = (id: number) => {
    notifications.value = notifications.value.filter((n) => n.id !== id)
  }

  const clearAll = () => {
    notifications.value = []
  }

  return {
    notifications,
    showNotification,
    showError,
    showSuccess,
    showWarning,
    showInfo,
    hideNotification,
    clearAll,
  }
}
