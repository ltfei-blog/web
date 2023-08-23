<script setup lang="ts">
import { useThemes } from '~/utils/theme'
defineOptions({
  name: 'app'
})
const appConfig = useAppConfig()

const mode = useThemes(appConfig.theme)

const click = () => {
  if (mode.value == 'light') {
    mode.value = 'dark'
  } else {
    mode.value = 'light'
  }
}
</script>

<template>
  <client-only>
    <button @click="click">mode {{ mode }}</button>
  </client-only>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style lang="less" scoped></style>
