export default defineNuxtConfig({
  ssr: true,

  app: {
    head: {
      charset: "utf-8",
      title: "Конвертер",
      viewport: "width=device-width, initial-scale=1, maximum-scale=1",
      htmlAttrs: {
        lang: "ru",
      },
    },
    pageTransition: { name: "page", mode: "out-in" },
  },

  css: [
    "@/assets/scss/bundle.scss",
  ],

  modules: [
    '@pinia/nuxt',
  ],

  nitro: {
    experimental: {
      websocket: true,
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/scss/mixins.scss" as *;`,
        }
      }
    }
  },

  build: {
    transpile: ['vue-countup-v3'],
  },

  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
})