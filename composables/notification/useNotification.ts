import { ref } from 'vue'

interface Notification {
  id: number
  message?: string
  link?: string
}

const notifications = ref<Notification[]>([])

export function useNotification() {
  const showNotification = (message: string, link: string = '', id: number) => {
    notifications.value.push({ id, message, link })

    setTimeout(() => {
      hideNotification(id)
    }, 5000)
  }

  const hideNotification = (id: number) => {
    notifications.value = notifications.value.filter((n) => n.id !== id)
  }

  return {
    notifications,
    showNotification,
    hideNotification,
  }
}
