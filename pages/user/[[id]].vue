<script setup lang="ts">
import { BAvatar } from '@ltfei-blog/blogui'
import { useUserStore } from '~/store/user'
import { User as IconUser } from '@icon-park/vue-next'
import { BCard, BCardFooterItem } from '@ltfei-blog/blogui'
import { GoodTwo as IconGoodTwo, Comment as IconComment } from '@icon-park/vue-next'
import {
  getMember as getMemberApi,
  MemberData,
  getPost as getPostApi,
  PostData
} from '~/apis/users/member'

defineOptions({
  name: 'PageUser'
})

definePageMeta({
  middleware: [
    async (to) => {
      const { isLogin, useUserInfo, user } = useUserStore()
      await useUserInfo()
      const id = to.params.id

      /**
       * 没有id(访问的不是其他人的主页)
       * 且没有登录(访问的不是自己的主页)
       */
      if (!id && !isLogin.value) {
        return navigateTo('/login')
      }
      // 已经登录了的 跳转到自己的主页
      if (!id) {
        return navigateTo({
          path: '/user/' + user.value.id
        })
      }

      return
    }
  ]
})

const route = useRoute()
const { isLogin } = useUserStore()
const id = route.params.id as string

const data = ref<MemberData>({
  username: '未登录',
  avatar: '',
  get_likes: 0,
  id: 0,
  register_date: 0
})
const posts = ref<PostData[]>([])

const res = await getMemberApi(Number(id))
data.value = res.data

const postsData = await getPostApi(Number(id))
posts.value = postsData.data

useSeoMeta({
  title: data.value.username + '的个人空间'
})

const activeKey = ref('1')
</script>

<template>
  <div class="page-user">
    <div class="user">
      <div class="top">
        <client-only>
          <div class="user-info">
            <div class="avatar">
              <nuxt-link v-if="!isLogin" to="/login" class="to-login-icon">
                <icon-user></icon-user>
              </nuxt-link>
              <template v-else>
                <b-avatar :src="data.avatar"></b-avatar>
              </template>
            </div>
            <div class="text">
              <div class="username">{{ data.username }}</div>
              <div class="desc">简介...</div>
            </div>
          </div>
        </client-only>
        <div class="operation">
          <a-button>编辑资料</a-button>
        </div>
      </div>
      <div class="data">
        <div class="item">
          <div class="name">获赞</div>
          <div class="value">{{ data.get_likes }}</div>
        </div>
        <div class="item">
          <div class="name">关注</div>
          <div class="value">0</div>
        </div>
        <div class="item">
          <div class="name">粉丝</div>
          <div class="value">0</div>
        </div>
      </div>
    </div>
    <div class="container">
      <a-tabs v-model:activeKey="activeKey" class="tabs">
        <a-tab-pane key="1" tab="投稿">
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
        <!-- <a-tab-pane key="2" tab="Tab 2" force-render>Content of Tab Pane 2</a-tab-pane>
        <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane> -->
      </a-tabs>
      <div class="sidebar"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.page-user {
  max-width: 900px;
  margin: 0 auto;
  // height: 10px;
  .user {
    background-color: @bg-color;
    width: 100%;
    padding: 15px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .user-info {
        display: flex;
        align-items: center;

        .text {
          margin-left: 8px;
          .username {
            font-size: 20px;
            font-weight: bold;
          }
          .desc {
            font-size: 16px;
          }
        }
      }
    }
    .data {
      align-self: flex-end;
      margin-top: 10px;
      display: flex;
      .item {
        display: flex;
        align-items: flex-end;
        flex-direction: row-reverse;
        margin-left: 10px;
        .name {
          font-size: 14px;
          color: @text-color-regular;
          margin: 0 2px;
        }
        .value {
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
  }
  .container {
    margin-top: 10px;
    display: flex;
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

      .tab-post {
        display: flex;
        flex-direction: column;
        .b-card {
          padding: 8px 20px;
          border-bottom: @black-opacity-1 1px solid;
          border-radius: 0px;
        }
      }
    }
    .sidebar {
      background-color: @bg-color;
      width: 200px;
      margin-left: 10px;
    }
  }
}
</style>
