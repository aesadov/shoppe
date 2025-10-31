import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-23',
  modules: ['@vueuse/nuxt', '@nuxt/image'],
  vite: {
    server: {
      hmr: {
        clientPort: 3000, // порт, на котором работает браузер
        port: 5173, // порт Vite сервера
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/scss/variables" as *;
          `,
        },
      },
    },
    plugins: [
      svgLoader({
        defaultImport: 'component',
      }),
    ],
    define: {
      'window.FormData': 'FormData',
      'self.FormData': 'FormData',
    },
  },
  css: ['~/assets/scss/main.scss'],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
    },
  },
  image: {
    format: ['webp'],
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },
})
