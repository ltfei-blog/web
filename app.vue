<script setup lang="ts">
import { useThemes } from '~/utils/theme'
import { useUserInfo } from '~/utils/userInfo'
import '@ltfei-blog/blogui/dist/style.css'
defineOptions({
  name: 'app'
})
const appConfig = useAppConfig()
useThemes(appConfig.theme)
useUserInfo()
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style lang="less" scoped></style>
