import { defineStore } from 'pinia'
import type { Notification } from '~/types/notification'

interface NotificationStateType {
  notifications: Notification[]
}

export const useNotificationStore = defineStore('notification', {
  state: (): NotificationStateType => ({
    notifications: [],
  }),

  actions: {
    show(payload: Notification) {
      this.notifications.push(payload)
    },

    hide(id: number) {
      this.notifications = this.notifications.filter((n) => n.id !== id)
    },

    hideAll() {
      this.notifications = []
    },
  },
})
