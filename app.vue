<script setup lang="ts">
import { useThemes } from '~/utils/theme'
import { useUserStore } from '~/store/user'
import '@ltfei-blog/blogui/dist/style.css'
defineOptions({
  name: 'app'
})
const appConfig = useAppConfig()
const { theme, mode } = useThemes(appConfig.theme)
const { useUserInfo } = useUserStore()
useUserInfo()

provide('themeMode', mode)
</script>

<template>
  <div>
    <a-config-provider
      :theme="{
        token: {
          colorPrimary: theme.primary
        }
      }"
    >
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </a-config-provider>
  </div>
</template>

<style lang="less" scoped></style>
