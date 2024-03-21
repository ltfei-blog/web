import { lessAdditionalData } from './utils/theme'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    '@ant-design-vue/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],
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
  },
  routeRules: {
    '/edit': {
      ssr: false
    },
    // user页仅关闭 /user ,不关闭带数字的 /user/[id]
    '/user': {
      ssr: false
    }
  }
})
