export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export interface NotificationOptions {
  link?: string
  LinkAdress?: string
  duration?: number
  id?: number
  icon?: string
}

export interface Notification extends NotificationOptions {
  id: number
  message: string
  type: NotificationType
}
