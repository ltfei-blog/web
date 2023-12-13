import { lessAdditionalData } from './utils/theme'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@vueuse/nuxt', '@element-plus/nuxt'],
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
    port: 80,
    host: 'blog.dev.ltfei.cn'
  }
})
