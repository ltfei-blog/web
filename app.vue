<script setup lang="ts">
import { useThemes } from '~/utils/theme'
import { useUserStore } from '~/store/user'
import '@ltfei-blog/blogui/dist/style.css'
defineOptions({
  name: 'app'
})
const appConfig = useAppConfig()
const { theme } = useThemes(appConfig.theme)
const { useUserInfo } = useUserStore()
useUserInfo()
</script>

<template>
  <div>
    <NuxtLayout>
      <a-config-provider
        :theme="{
          token: {
            colorPrimary: theme.primary
          }
        }"
      >
        <NuxtPage />
      </a-config-provider>
    </NuxtLayout>
  </div>
</template>

<style lang="less" scoped></style>
