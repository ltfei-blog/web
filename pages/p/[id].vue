<script setup lang="ts">
import { details as detailsApi } from '~/apis/articles/details'

defineOptions({
  name: 'PageP'
})

const route = useRoute()
const id = Number(route.params.id as string)

const res = await detailsApi(id)
const data = reactive(res.data)

if (!data) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found'
  })
}

useSeoMeta({
  title: `ltfei-blog ${data.title}`,
  description: data.desc,
  keywords: data.desc
})
</script>

<template>
  <div class="page-p" v-if="data">
    <page-header
      :title="data.title!"
      :date="data.create_time"
      :author-id="data.author"
      :avatar="data.author_data?.avatar"
      :username="data.author_data?.username"
      :likes="data.likes_count || 0"
      :comments="data.comments_count"
    />
    <lazy-v-md-preview :text="data.content" />
    <page-footer :id="id" :author="data.author" />
  </div>
  <client-only>
    <page-sidebar
      v-if="data"
      :id="id"
      v-model:likes="data.likes_count"
      v-model:liked="data.liked"
      :comments="data.comments_count"
    />
  </client-only>
</template>

<style lang="less" scoped>
.page-p {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  min-height: 80vh;
  background-color: @bg-color;
  box-sizing: border-box;
  padding: 20px;
  transition: all 0.3s;
  .min-width(700px, {
    padding: 20px 8px;

  });
}
.ant-float-btn {
  position: unset;
}
</style>
