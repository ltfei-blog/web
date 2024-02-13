<script setup lang="ts">
import { details as detailsApi } from '~/apis/articles/details'

defineOptions({
  name: 'PageP'
})

const route = useRoute()
const id = Number(route.params.id as string)

const { data } = await detailsApi(id)

useSeoMeta({
  title: `ltfei-blog ${data.title}`,
  description: data.desc,
  keywords: data.desc
})
</script>

<template>
  <div class="page-p">
    <page-header
      :title="data.title!"
      :date="data.create_time"
      :avatar="data.author_data.avatar"
      :username="data.author_data.username"
    />
    <lazy-v-md-preview :text="data.content" />
    <page-footer :id="id" :author="data.author" />
  </div>
  <client-only>
    <page-sidebar :id="id" :likes="data.likes_count || 0" :liked="Boolean(data.liked)" />
  </client-only>
</template>

<style lang="less" scoped>
.page-p {
  max-width: 800px;
  margin: 0 auto;
  min-height: 80vh;
  background-color: @bg-color;
  box-sizing: border-box;
  padding: 20px;
  transition: all 0.3s;
  .min-width(700px, {
    padding: 20px 0;

  });
}
.ant-float-btn {
  position: unset;
}
</style>
