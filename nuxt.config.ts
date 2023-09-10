import { lessAdditionalData } from './utils/theme'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@vueuse/nuxt'],
  css: ['@/assets/main.less'],
  vite: {
    css: {
      preprocessorOptions: {
        less: {
          additionalData: lessAdditionalData()
        }
      }
    }
  },
  devServer: {
    port: 5173
  }
})
