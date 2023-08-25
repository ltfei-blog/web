<script setup lang="ts">
import { useThemes } from '~/utils/theme'
defineOptions({
  name: 'app'
})
// const appConfig = useAppConfig()
// const mode = useThemes(appConfig.theme)
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style lang="less" scoped></style>
