import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-23',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/scss/variables" as *;
          `,
        }
      }
    },
    plugins: [
      svgLoader({
        defaultImport: 'component'
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