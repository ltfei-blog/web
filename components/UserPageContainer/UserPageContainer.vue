<script setup lang="ts">
import { BCard, BCardFooterItem } from '@ltfei-blog/blogui'
import {
  GoodTwo as IconGoodTwo,
  Comment as IconComment,
  FileWord as IconFileWord,
  Like as IconLike
} from '@icon-park/vue-next'
import {
  getPost as getPostApi,
  PostData,
  getLikes as getLikesApi,
  LikesData
} from '~/apis/users/member'
import { useUserStore } from '~/store/user'

defineOptions({
  name: 'UserPageContainer'
})
const { isLogin, user } = useUserStore()
const route = useRoute()
const id = route.params.id as string

const activeKey = ref('1')

const posts = ref<PostData[]>([])
const likes = ref<LikesData[]>([])

const getPosts = async () => {
  const postsData = await getPostApi(Number(id))
  posts.value = postsData.data
}
getPosts()

const getLikes = async () => {
  const res = await getLikesApi()
  likes.value = res.data
}
if (process.client && isLogin.value && id == user.value.id.toString()) {
  getLikes()
}
</script>

<template>
  <a-tabs v-model:activeKey="activeKey" class="tabs">
    <a-tab-pane key="1">
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
    <a-tab-pane key="2" v-if="likes.length > 0">
      <template #tab>
        <span>
          <icon-like theme="filled" fill="red" />
          喜欢
        </span>
      </template>
      <div class="tab tab-likes">
        <b-card
          v-for="i in likes"
          :key="i.id"
          :title="i.user_likes_data.title"
          :to="`/p/${i.id}`"
          router
          :auto-collapse="470"
          :desc="i.user_likes_data.desc"
          :viewUser="false"
          :cover="i.user_likes_data.cover"
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

    <!-- <a-tab-pane key="2" tab="Tab 2" force-render>Content of Tab Pane 2</a-tab-pane>
        <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane> -->
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
