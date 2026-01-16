export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

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
