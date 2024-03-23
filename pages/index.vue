<script setup lang="ts">
import { BCard, BCardFooterItem } from '@ltfei-blog/blogui'
import { list as listApi } from '~/apis/articles/list'
import { GoodTwo as IconGoodTwo, Comment as IconComment } from '@icon-park/vue-next'

defineOptions({
  name: 'PageIndex'
})

useSeoMeta({
  title: 'ltfei-blog'
})

const data = await useAsyncData('getArticles', () => listApi())
</script>

<template>
  <!-- card demo -->
  <div class="index">
    <div class="cards">
      <b-card
        v-for="i in data.data.value?.data"
        :key="i.id"
        :title="i.title"
        :to="`/p/${i.id}`"
        router
        :auto-collapse="470"
        :desc="i.desc"
        :username="i.author_data.username"
        :avatar="i.author_data.avatar"
        :cover="i.cover"
        :date="i.create_time"
      >
        <template #footer>
          <b-card-footer-item :text="i.likes_count?.toString() || '0'">
            <template #icon>
              <icon-good-two size="16" />
            </template>
          </b-card-footer-item>
          <b-card-footer-item :text="i.comments_count.toString()">
            <template #icon>
              <icon-comment size="16" />
            </template>
          </b-card-footer-item>
        </template>
      </b-card>
    </div>
    <div class="sidebar">
      <index-sidebar />
    </div>
  </div>
</template>

<style lang="less" scoped>
.index {
  display: flex;
  width: 100%;
  justify-content: center;
  .cards {
    width: 100%;
    max-width: 800px;
    margin: 0 8px;
  }

  .sidebar {
    margin: 0 8px;
    width: 300px;
    flex-shrink: 0;
    .min-width(700px, {
      display: none;
    });
  }
}
.b-card {
  margin: 15px 0;
  display: block;
  box-shadow: 3px 3px 5px 0 @black-opacity-1;
  transition: all 0.3s;
  &:hover {
    box-shadow: 5px 5px 8px 0 @black-opacity-2;
  }
}
</style>
