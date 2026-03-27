import { defineStore } from 'pinia'
import { useFetchApi } from '~/composables/api/useFetchApi'

interface LoginCredentials {
  username: string
  password: string
}

export const useAuth = defineStore('auth', {
  state: () => ({
    token: '',
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(credentials: LoginCredentials) {
      this.token = ''

      try {
        const { fetchApi } = useFetchApi()

        const data = await fetchApi<{ token: string }>('/auth/login', {
          method: 'POST',
          body: {
            username: credentials.username,
            password: credentials.password,
          },
        })

        if (!data) {
          throw new Error('Сервер не вернул данные')
        }

        if (!data.token) {
          throw new Error('Сервер не вернул токен доступа')
        }

        this.token = data.token

        localStorage.setItem('auth_token', data.token)

        return {
          success: true,
          data,
        }
      } catch (error) {
        console.error('Login error:', error)

        this.token = ''
        localStorage.removeItem('auth_token')

        return {
          success: false,
          error: error instanceof Error ? error.message : 'Ошибка подключения к серверу',
        }
      }
    },

    logout() {
      this.token = ''
      localStorage.removeItem('auth_token')
    },

    initAuth() {
      const token = localStorage.getItem('auth_token')
      if (token) {
        this.token = token
      }
    },
  },
})
