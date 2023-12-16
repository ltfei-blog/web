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
  <div class="sidebar-container">
    <div class="sidebar">
      <div class="box"></div>
      <a-back-top />
    </div>
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
.sidebar-container {
  max-width: 950px;
  padding: 0 10px;
  box-sizing: border-box;

  position: fixed;
  top: 70vh;
  left: 0;
  right: 0;
  margin: auto;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  .box {
    background-color: @bg-color;
    width: 40px;
    height: 100px;
    border-radius: 10px;
    margin-bottom: 12px;
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05);
  }
}
.ant-float-btn {
  position: unset;
}
</style>
