import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-23',
  modules: ['@vueuse/nuxt', '@nuxt/image', '@pinia/nuxt', '@vite-pwa/nuxt'],

  pwa: {
    registerType: 'autoUpdate',
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico,woff,woff2,ttf}'],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/via\.assets\.so\/.*/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images-cdn',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 30 * 24 * 60 * 60,
            },
          },
        },
        {
          urlPattern: /^https:\/\/fakestoreapi\.com\/.*/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 5 * 60,
            },
          },
        },
      ],
    },
    manifest: false,
  },

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: `${process.env.NUXT_APP_BASE_URL || '/'}favicon.ico`,
        },
        {
          rel: 'preconnect',
          href: 'https://via.assets.so',
        },
      ],
    },
  },

  imports: {
    autoImport: true,
    presets: [
      {
        from: 'pinia',
        imports: ['defineStore', 'acceptHMRUpdate'],
      },
    ],
  },

  vite: {
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
