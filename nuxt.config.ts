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
    }
  },
  css: ['~/assets/scss/main.scss']
})