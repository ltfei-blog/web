<script setup lang="ts">
import { BAvatar } from '@ltfei-blog/blogui'
import {
  User as IconUser,
  Editor as IconEditor,
  Moon as IconMoon,
  Sun as IconSun,
  Logout as IconLogout
} from '@icon-park/vue-next'
import { useUserStore } from '~/store/user'

defineOptions({
  name: 'NavUserDetail'
})

defineProps<{
  src: string
  get_likes: number
  followers: number
  following: number
  username: string
}>()

const visible = ref(false)
const { logOut } = useUserStore()

const options: {
  name: string
  icon: Component
  dividingLine?: boolean
  to?: string
  click?: () => void
}[] = [
  {
    name: '个人主页',
    icon: IconUser,
    to: '/user'
  },
  // todo: 创作中心页面
  {
    name: '作品管理',
    icon: IconEditor,
    to: '/user'
  },
  {
    name: '退出登录',
    icon: IconLogout,
    dividingLine: true,
    click() {
      Modal.confirm({
        title: '确定要退出登录吗？',
        cancelText: '取消',
        okText: '确定',
        onOk() {
          logOut()
          message.success('已退出登录')
        }
      })
    }
  }
]

const theme = inject<'dark' | 'light'>('themeMode')

const navUserDetailRef = ref()
const getPopupContainer = () => {
  return navUserDetailRef.value
}
</script>

<template>
  <div class="nav-user-detail" ref="navUserDetailRef">
    <a-tooltip
      v-model:open="visible"
      color="var(--bg-color)"
      overlayClassName="tooltip-overlay"
      placement="bottom"
      :getPopupContainer="getPopupContainer"
    >
      <template #title>
        <div class="detail">
          <div class="username">{{ username }}</div>
          <div class="data">
            <div class="item">
              <div class="name">关注</div>
              <div class="value">{{ following }}</div>
            </div>
            <div class="item">
              <div class="name">粉丝</div>
              <div class="value">{{ followers }}</div>
            </div>
            <div class="item">
              <div class="name">获赞</div>
              <div class="value">{{ get_likes }}</div>
            </div>
          </div>
          <div class="theme">
            <div>暗色模式</div>
            <a-switch v-model:checked="theme" checkedValue="dark" unCheckedValue="light">
              <template #unCheckedChildren><IconSun /></template>
              <template #checkedChildren><IconMoon /></template>
            </a-switch>
          </div>
          <div class="options">
            <nuxt-link
              v-for="i in options"
              :key="i.name"
              :to="i.to"
              @click="i.click"
              class="item"
              :class="i.dividingLine ? 'dividing-line' : ''"
            >
              <div class="text">
                <div class="icon">
                  <component :is="i.icon"></component>
                </div>
                <div class="text">{{ i.name }}</div>
              </div>
              <span class="right">></span>
            </nuxt-link>
          </div>
        </div>
      </template>
      <div class="avatar-container">
        <b-avatar class="avatar" :class="visible ? 'open' : 'hide'" :src="src"></b-avatar>
      </div>
    </a-tooltip>
  </div>
</template>

<style lang="less">
.tooltip-overlay {
  z-index: 90;
  width: 260px;
}
</style>
<style lang="less" scoped>
.nav-user-detail {
  margin-right: 20px;

  .avatar-container {
    width: 50px;
    height: 50px;
    .avatar {
      transition: all 0.3s;
      position: relative;
      z-index: 200;
      &.open {
        transform-origin: top;
        transform: scale(1.6);
      }
    }
    .min-width(400px, {
      width: 40px;
      height: 40px;
      .avatar {
        width: 40px;
        height: 40px;
      }
    });
  }
}
.detail {
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 100%;
  color: @text-color;
  .username {
    text-align: center;
    color: @text-color;
    font-size: 18px;
    font-weight: bold;
    margin-top: 5px;
  }
  .data {
    display: flex;
    justify-content: space-around;
    margin-top: 8px;
    .item {
      display: flex;
      flex-direction: column-reverse;
      align-items: center;

      .name {
        font-size: 12px;
      }
    }
  }
  .theme {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    :deep(.ant-switch-inner) {
      display: flex;
      align-items: center;
    }
    :deep(.ant-switch-inner-unchecked) {
      margin-top: 0;
    }
  }
  .options {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    .item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      height: 30px;
      margin-top: 8px;
      .text {
        display: flex;
        align-items: center;
        font-size: 16px;
        margin-left: 3px;
      }
      &.dividing-line {
        padding-top: 10px;
        border-top: @text-color-disabled solid 1px;
      }
    }
  }
}
</style>
