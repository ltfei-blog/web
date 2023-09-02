<script setup lang="ts">
import { useThemes } from '~/utils/theme'
import '@ltfei-blog/blogui/dist/style.css'
defineOptions({
  name: 'app'
})
const appConfig = useAppConfig()
useThemes(appConfig.theme)
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style lang="less" scoped></style>
