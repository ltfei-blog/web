<script setup lang="ts">
import { search as searchApi } from '~/apis/articles/search'
import { BCardOne, BCardFooterItem } from '@ltfei-blog/blogui'
import { GoodTwo as IconGoodTwo, Comment as IconComment } from '@icon-park/vue-next'
import { useSearchHistoryStore } from '~/store/searchHistory'
import { Articles } from '~/types/api'
import NoResults from '~/components/Illustrations/NoResults.vue'

defineOptions({
  name: 'PageSearch'
})

const { addHistory } = useSearchHistoryStore()
const route = useRoute()
const keyword = ref(route.query.w as string)
const loading = ref(false)

const result = ref<Articles[]>([])
const search = async () => {
  loading.value = true
  if (process.client) {
    addHistory(keyword.value)
  }
  const { data } = await searchApi(keyword.value)
  result.value = data
  loading.value = false
}
search()

watch(
  () => route.query.w,
  () => {
    keyword.value = route.query.w as string
    search()
  }
)
</script>

<template>
  <div class="page-search">
    <div class="search-input">
      <nav-search v-model:keyword="keyword"></nav-search>
    </div>

    <div class="result" v-if="(result && result.length > 0) || loading">
      <a-spin tip="Loading..." :spinning="loading">
        <b-card-one
          v-for="i in result"
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
        </b-card-one>
      </a-spin>
    </div>
    <div class="empty" v-else>
      <NoResults />
    </div>
  </div>
</template>

<style lang="less" scoped>
.page-search {
  max-width: 800px;
  background-color: @bg-color;
  margin: 0 auto;
  min-height: 80vh;
  padding: 20px;
  box-sizing: border-box;
  .search-input {
    :deep(.nav-search) {
      --height: 32px;
    }
  }
  .result {
    .ant-spin {
      display: block;
      margin: 120px auto;
    }
  }
  .empty {
    width: 80%;
    margin: auto;
  }
}
</style>
