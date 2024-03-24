<script setup lang="ts">
import { BCard, BCardOne, BCardFooterItem } from '@ltfei-blog/blogui'
import {
  GoodTwo as IconGoodTwo,
  Comment as IconComment,
  FileWord as IconFileWord,
  Like as IconLike,
  History as IconHistory
} from '@icon-park/vue-next'
import {
  getPost as getPostApi,
  type PostData,
  getLikes as getLikesApi,
  type LikesData,
  getHistory as getHistoryApi,
  type HistoryData
} from '~/apis/users/member'
import { useUserStore } from '~/store/user'
import { useHash, tabs } from './useHash'

defineOptions({
  name: 'UserPageContainer'
})
const { isLogin, user } = useUserStore()
const route = useRoute()
const id = route.params.id as string

const { activeKey } = useHash()

const posts = ref<PostData[]>([])
const likes = ref<LikesData[]>([])
const history = ref<HistoryData[]>([])

const getPosts = async () => {
  const postsData = await getPostApi(Number(id))
  posts.value = postsData.data
}
getPosts()

const getLikes = async () => {
  const res = await getLikesApi()
  likes.value = res.data
}

const getHistory = async () => {
  const res = await getHistoryApi()
  history.value = res.data
}

if (process.client && isLogin.value && id == user.value.id.toString()) {
  getLikes()
  getHistory()
}
</script>

<template>
  <!-- 隐藏的锚点元素，避免vue-router警告找不到对应元素 -->
  <h6 v-for="i in tabs" :key="i" :id="i" style="display: none"></h6>
  <a-tabs v-model:activeKey="activeKey" class="tabs">
    <a-tab-pane key="post">
      <template #tab>
        <span>
          <icon-file-word theme="filled" fill="rgb(64, 158, 255)" />
          投稿
        </span>
      </template>
      <div class="tab tab-post">
        <b-card
          v-for="i in posts"
          :key="i.id"
          :title="i.title"
          :to="`/p/${i.id}`"
          router
          :auto-collapse="470"
          :desc="i.desc"
          :viewUser="false"
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
    </a-tab-pane>
    <a-tab-pane key="like" v-if="likes.length > 0">
      <template #tab>
        <span>
          <icon-like theme="filled" fill="red" />
          喜欢
        </span>
      </template>
      <div class="tab tab-likes">
        <b-card-one
          v-for="i in likes"
          :key="i.id"
          :title="i.user_likes_data.title"
          :to="`/p/${i.id}`"
          router
          :desc="i.user_likes_data.desc"
          :cover="i.user_likes_data.cover"
          :date="i.create_time"
          :username="i.user_likes_data.author_data.username"
          :avatar="i.user_likes_data.author_data.avatar"
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
      </div>
    </a-tab-pane>
    <a-tab-pane key="history" v-if="history.length > 0">
      <template #tab>
        <span>
          <icon-history theme="filled" fill="var(--text-color)" />
          历史记录
        </span>
      </template>
      <div class="tab tab-history">
        <b-card-one
          v-for="{ browsing_history_article_data: article } in history"
          :key="article.id"
          :title="article.title"
          :to="`/p/${article.id}`"
          router
          :desc="article.desc"
          :cover="article.cover"
          :date="article.create_time"
          :username="article.author_data.username"
          :avatar="article.author_data.avatar"
        >
          <template #footer>
            <b-card-footer-item :text="article.likes_count?.toString() || '0'">
              <template #icon>
                <icon-good-two size="16" />
              </template>
            </b-card-footer-item>
            <b-card-footer-item :text="article.comments_count.toString()">
              <template #icon>
                <icon-comment size="16" />
              </template>
            </b-card-footer-item>
          </template>
        </b-card-one>
      </div>
    </a-tab-pane>
  </a-tabs>
</template>

<style lang="less" scoped>
.tabs {
  background-color: @bg-color;
  flex: 1;
  box-sizing: border-box;
  // tab标签栏置顶
  :deep(.ant-tabs-nav) {
    position: sticky;
    top: 60px;
    background-color: @bg-color;
    z-index: 90;
    padding: 0 10px;
  }
  .i-icon {
    display: inline;
  }

  .tab {
    display: flex;
    flex-direction: column;
    .b-card {
      padding: 8px 20px;
      border-bottom: @black-opacity-1 1px solid;
      border-radius: 0px;
    }
  }
}
</style>
