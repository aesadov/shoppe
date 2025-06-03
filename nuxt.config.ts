import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-23',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/scss/variables" as *;
            @use "~/assets/scss/mixins/container" as *;
          `,
        }
      }
    },
    plugins: [
      svgLoader({
        defaultImport: 'component' // Это ключевая настройка!
      }),
    ]
  },
  css: ['~/assets/scss/main.scss'],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
    },
  },
})