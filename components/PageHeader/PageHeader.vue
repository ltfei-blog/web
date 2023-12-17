<script setup lang="ts">
import dayjs from 'dayjs'
import { BAvatar } from '@ltfei-blog/blogui'

defineOptions({
  name: 'PageHeader'
})

defineProps<{
  title: string
  date: number
  avatar: string
  username: string
}>()
</script>

<template>
  <h1 class="title">{{ title }}</h1>
  <div class="info">
    <div class="date">{{ dayjs(date).format('YYYY-MM-DD HH:mm') }}</div>
    <div>1095阅读 · 24喜欢 · 0评论</div>
  </div>
  <div class="author">
    <div class="author-info">
      <b-avatar class="avatar" :src="avatar"></b-avatar>
      <div class="author-user-info">
        <div class="name">{{ username }}</div>
        <div class="data">
          <span>粉丝：0</span>
          <span>文章：1</span>
        </div>
      </div>
    </div>
    <a-button type="primary">关注</a-button>
  </div>
</template>

<style lang="less" scoped>
.title,
.info,
.author {
  padding: 0 32px;
  box-sizing: border-box;
}
.title {
  font-size: 28px;
  font-weight: 700;
}
.info {
  font-size: 14px;
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  .date {
    margin-right: 30px;
  }
}
.author {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  .author-info {
    display: flex;
    align-items: center;
    .avatar {
      margin-right: 10px;
      flex-shrink: 0;
    }
    .author-user-info {
      display: flex;
      flex-direction: column;
      font-size: 12px;
      .name {
        font-weight: 700;
      }
      .data {
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
}
</style>
