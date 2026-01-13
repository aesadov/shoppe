import { defineStore } from 'pinia'
import type { Notification, NotificationType } from '~/types/notification'

interface ShowPayload {
  id: number
  message: string
  type: NotificationType
  link?: string
  LinkAdress?: string
  icon?: string
}

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [] as Notification[],
  }),

  actions: {
    show(payload: ShowPayload) {
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
