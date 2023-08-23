// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@vueuse/nuxt'],
  css: ['@/assets/main.less'],
  vite: {
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `
            // @import url(@/assets/themes/main.less);
            @import url(@/assets/theme.less);
          `
        }
      }
    }
  }
})
