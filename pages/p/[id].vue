<script setup lang="ts">
import { details as detailsApi } from '~/apis/articles/details'
defineOptions({
  name: 'PageP'
})

const route = useRoute()
const id = route.params.id as string

const data = await useAsyncData('getDetails', () => detailsApi(id))
</script>

<template>
  <div class="page-p">
    <h1>{{ data.data.value?.data.title }}</h1>
    <lazy-v-md-preview :text="data.data.value?.data.content" />
  </div>
</template>

<style lang="less" scoped>
.page-p {
  max-width: 800px;
  margin: 0 auto;
  min-height: 80vh;
  background-color: @bg-color;
  padding: 20px;
  box-sizing: border-box;
}
</style>
