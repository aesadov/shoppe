interface StorageItem {
  value: string
  date: string
}

type StorageData = StorageItem[]

export const useStorage = () => {
  const saveToStorage = (key: string, value: string) => {
    try {
      const existingData = localStorage.getItem(key)
      const items: StorageData = existingData ? JSON.parse(existingData) : []

      const newItem: StorageItem = {
        value,
        date: new Date().toISOString(),
      }

      items.push(newItem)
      localStorage.setItem(key, JSON.stringify(items))
    } catch (error) {
      console.error('Error saving to storage:', error)
    }
  }

  const getFromStorage = (key: string): StorageData => {
    try {
      const data = localStorage.getItem(key)
      if (!data) return []

      return JSON.parse(data) as StorageData
    } catch (error) {
      console.error('Error reading from storage:', error)
      return []
    }
  }

  const clearStorage = (key: string) => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Error clearing storage:', error)
    }
  }

  return {
    saveToStorage,
    getFromStorage,
    clearStorage,
  }
}
