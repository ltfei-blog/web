<script setup lang="ts">
import { BCard, BCardFooterItem } from '@ltfei-blog/blogui'
import { list as listApi } from '~/apis/articles/list'
import { GoodTwo as IconGoodTwo, Comment as IconComment } from '@icon-park/vue-next'
import { Articles } from '~/types/api'

defineOptions({
  name: 'PageIndex'
})

useSeoMeta({
  title: 'ltfei-blog'
})

const count = ref(10)
const page = ref(0)
const list = ref<Articles[]>([])
const indexRef = ref<HTMLElement | null>()
const loading = ref(false)
const noMore = ref(false)

const getArticles = async () => {
  loading.value = true
  const res = await listApi(count.value, page.value * count.value)
  list.value.push(...res.data)
  if (res.data.length == 0) {
    noMore.value = true
  }
  loading.value = false
}
getArticles()

onMounted(() => {
  useInfiniteScroll(
    indexRef,
    async () => {
      if (loading.value || noMore.value) {
        return
      }
      page.value += 1
      await getArticles()
    },
    {
      distance: 10
    }
  )
})
</script>

<template>
  <div class="index" ref="indexRef">
    <div class="cards">
      <b-card
        v-for="i in list"
        :key="i.id"
        :title="i.title"
        :to="`/p/${i.id}`"
        :router="true"
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
      <div class="tip" v-if="loading">正在加载……</div>
      <div class="tip" v-else-if="noMore">没有更多了</div>
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
  // height: 100vh;
  overflow: auto;
  .cards {
    width: 100%;
    max-width: 800px;
    margin: 0 8px;

    .tip {
      text-align: center;
      padding: 20px 0;
      color: @text-color-placeholder;
    }
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
