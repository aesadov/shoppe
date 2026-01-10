export interface Icon {
  to?: string
  icon: string
  ariaLabel: string
  click?: () => void
}

export interface DecktopIcon extends Icon {
  isActive: () => boolean
}
