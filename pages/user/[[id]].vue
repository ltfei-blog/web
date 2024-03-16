<script setup lang="ts">
import { BAvatar } from '@ltfei-blog/blogui'
import { useUserStore } from '~/store/user'
import { User as IconUser } from '@icon-park/vue-next'
defineOptions({
  name: 'PageUser'
})
useSeoMeta({
  title: '个人空间'
})
const { isLogin, user } = useUserStore()

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
                <b-avatar :src="user.avatar"></b-avatar>
              </template>
            </div>
            <div class="text">
              <div class="username">{{ user.username }}</div>
              <div class="desc">简介...</div>
            </div>
          </div>
        </client-only>
        <div class="operation">
          <a-button>编辑资料</a-button>
        </div>
      </div>
      <div class="data">粉丝 100 关注 99 收藏 10</div>
    </div>
    <div class="container">
      <a-tabs v-model:activeKey="activeKey" class="tabs">
        <a-tab-pane key="1" tab="Tab 1">Content of Tab Pane 1</a-tab-pane>
        <a-tab-pane key="2" tab="Tab 2" force-render>Content of Tab Pane 2</a-tab-pane>
        <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
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
    }
  }
  .container {
    margin-top: 10px;
    display: flex;
    .tabs {
      background-color: @bg-color;
      flex: 1;
      padding: 0 10px;
      box-sizing: border-box;
    }
    .sidebar {
      background-color: @bg-color;
      width: 200px;
      margin-left: 10px;
    }
  }
}
</style>
