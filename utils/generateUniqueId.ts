export const generateUniqueId = (prefix: string) =>
  `${prefix}-${Math.random().toString(36).substring(2, 11)}`
