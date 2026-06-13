<script setup lang="ts">
import {
  WeixinMiniApp,
  BrowserChrome,
  Android,
  Apple,
  Windows,
  Spanner,
  More
} from '@icon-park/vue-next'
import PlatformOperation from './_components/PlatformOperation.vue'
import { PlatformsId } from './_components/types'
defineOptions({
  name: 'PageDownload'
})

definePageMeta({
  layout: false
})

const platforms: {
  id: PlatformsId
  name: string
  icon: Component
  color: string
  isDev?: boolean
}[] = [
  {
    id: PlatformsId.web,
    name: 'WEB',
    icon: BrowserChrome,
    color: '#333'
  },
  {
    id: PlatformsId.miniprogram,
    name: '小程序',
    icon: WeixinMiniApp,
    color: '#1AAD19'
  },
  {
    id: PlatformsId.android,
    name: '安卓',
    icon: Android,
    color: '#47D886'
  },
  {
    id: PlatformsId.ios,
    name: 'IOS',
    icon: Apple,
    color: '#333333',
    isDev: true
  },
  {
    id: PlatformsId.windows,
    name: 'Windows',
    icon: Windows,
    color: '#01A9E9',
    isDev: true
  },
  {
    id: PlatformsId.more,
    name: '更多平台',
    icon: More,
    color: '#333',
    isDev: true
  }
]

const selectId = ref<PlatformsId>()

const switchSelectId = (id: PlatformsId) => {
  selectId.value = id
}

const showPlatformOperationId = computed<null | PlatformsId>(() => {
  const platform = platforms.find((e) => e.id == selectId.value)
  if (platform && !platform.isDev) {
    return platform.id
  }
  return null
})
</script>

<template>
  <div class="download">
    <nav>
      <nuxt-link to="/" class="left-entry">
        <div class="logo">
          <img src="assets/logo.webp" alt="logo" />
        </div>
        <div class="nav-title">Ltfei Blog</div>
      </nuxt-link>
    </nav>
    <div class="container">
      <h1 class="title">下载客户端</h1>
      <div class="platforms">
        <div
          class="platforms-item"
          v-for="e in platforms"
          :key="e.id"
          @mouseenter="switchSelectId(e.id)"
          @click="switchSelectId(e.id)"
        >
          <div class="is_dev" v-if="e.isDev">
            <Spanner />
            开发中...
          </div>
          <div class="icon">
            <Component :is="e.icon" theme="filled" size="46" :fill="e.color || '#000'" />
          </div>
          <div class="name">{{ e.name }}</div>
        </div>
      </div>
      <PlatformOperation :show="showPlatformOperationId" />
    </div>
    <div class="footer">
      <div class="copyright">&copy;2021-2026 litfa all rights reserved.</div>
      <a href="https://beian.miit.gov.cn/" target="_blank">豫ICP备2021024510号-3</a>
    </div>
  </div>
</template>

<style lang="less" scoped>
.download {
  width: 100%;
  background-color: @bg-color;
  height: 100vh;
  position: relative;
  overflow: hidden;
  overflow-y: auto;

  &::after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    background: radial-gradient(50% 50% at 50% 50%, #4772fa 0, rgba(71, 114, 250, 0) 100%);
    left: 0;
    top: 0;
    opacity: 0.2;
    transform: scale(1.4);
    z-index: 0;
    pointer-events: none;
  }

  nav {
    width: 100%;
    box-sizing: border-box;
    padding: 8px 16px;
    .left-entry {
      display: flex;
      align-items: center;

      .logo {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .nav-title {
        font-size: 20px;
        font-weight: 500;
        color: @text-color;
      }
      .min-width(400px, {
        .title {
          font-size: 16px
        }
        .logo {
          width: 40px;
          height: 40px;
        }
      });
    }
  }
  .container {
    position: relative;
    z-index: 1;
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      margin-top: 40px;
    }
    .platforms {
      display: flex;
      gap: 30px;
      margin-top: 24px;
      justify-content: space-around;
      width: 100%;
      flex-wrap: wrap;

      .platforms-item {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background-color: #ffffff59;
        position: relative;
        overflow: hidden;
        transition: all 0.3s;
        &:hover {
          transform: scale(1.1);
        }
        .is_dev {
          position: absolute;
          background-color: #00000059;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 18px;
          font-weight: bold;
          color: #fff;
        }
      }
      .min-width(430px, {
        column-gap: 8px;
        .platforms-item {
          width: 90px;
          height: 90px;
          font-size: 12px
        }
      });
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 16px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    div,
    a {
      font-size: 12px;
      color: #aaaa;
    }
  }
}
</style>
