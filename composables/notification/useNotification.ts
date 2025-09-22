import { ref } from 'vue'

export type NotificationType = 'success' | 'error' | 'warning' | 'info'

interface Notification {
  id: number
  message: string
  type: NotificationType
  link?: string
  duration?: number
  icon?: string
}

const notifications = ref<Notification[]>([])
let nextId = 0

export function useNotification() {
  const generateId = () => ++nextId

  const showNotification = (
    message: string,
    type: NotificationType = 'info',
    options: {
      link?: string
      duration?: number
      id?: number
      icon?: string
    } = {},
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

  const showError = (message: string, options?: Parameters<typeof showNotification>[2]) => {
    return showNotification(message, 'error', options)
  }

  const showSuccess = (message: string, options?: Parameters<typeof showNotification>[2]) => {
    return showNotification(message, 'success', options)
  }

  const showWarning = (message: string, options?: Parameters<typeof showNotification>[2]) => {
    return showNotification(message, 'warning', options)
  }

  const showInfo = (message: string, options?: Parameters<typeof showNotification>[2]) => {
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
