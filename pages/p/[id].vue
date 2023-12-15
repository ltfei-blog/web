<script setup lang="ts">
import { details as detailsApi } from '~/apis/articles/details'
defineOptions({
  name: 'PageP'
})

const route = useRoute()
const id = route.params.id as string

const { data } = await useAsyncData('getDetails', () => detailsApi(id))

useSeoMeta({
  title: `ltfei-blog ${data.value?.data.title}`,
  description: data.value?.data.desc,
  keywords: data.value?.data.desc
})
</script>

<template>
  <div class="page-p">
    <page-header
      :title="data?.data.title!"
      :date="data!.data.create_time"
      :avatar="data!.data.author_data.avatar"
      :username="data!.data.author_data.username"
    />
    <lazy-v-md-preview :text="data?.data.content" />
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
