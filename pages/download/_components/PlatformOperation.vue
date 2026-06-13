<script setup lang="ts">
import { PlatformsId } from './types'
import { Link } from '@icon-park/vue-next'

defineOptions({
  name: 'PlatformOperation'
})

defineProps<{
  show: PlatformsId | null
}>()
</script>

<template>
  <div class="operation" :class="{ 'no-select': show === null }">
    <div class="platform-info" :class="{ show: show === PlatformsId.web }">
      <div class="left">
        <h2 class="platforms-title">WEB</h2>
        <a-button type="primary" :icon="h(Link)" size="large" @click="$router.push('/')">
          点击进入
        </a-button>
      </div>
      <div class="right">
        <img src="assets/download_page_platform_web.png" alt="" />
      </div>
    </div>
    <div
      class="platform-info platform-info-miniprogram"
      :class="{ show: show === PlatformsId.miniprogram }"
    >
      <div class="left">
        <h2 class="platforms-title">微信小程序</h2>
        <div>扫码访问</div>
        <img src="assets/gh_e9be314c6626_258_transparent.png" alt="" />
      </div>
      <div class="right">
        <img src="assets/download_page_platform_all.png" alt="" />
      </div>
    </div>
    <div class="platform-info" :class="{ show: show === PlatformsId.android }">
      <div class="left">
        <h2 class="platforms-title">Android</h2>
        <a-button
          type="primary"
          :icon="h(Link)"
          size="large"
          href="https://github.com/ltfei-blog/mobile/releases"
          target="_blank"
        >
          Github下载
        </a-button>
        <a href="https://github.com/ltfei-blog/mobile/releases" target=""> </a>
      </div>
      <div class="right">
        <img src="assets/download_page_platform_android.png" alt="" />
      </div>
    </div>
    <div class="platform-info platform-info-not-select" :class="{ show: show === null }">
      <div class="right">
        <img src="assets/download_page_platform_all.png" alt="" />
      </div>
    </div>

    <div class="render-image"></div>
  </div>
</template>

<style lang="less" scoped>
.operation {
  width: 100%;
  position: relative;
  min-height: 260px;
  padding: 24px 0;
  &.no-select .platform-info {
    .left {
      transform: translateX(50%);
    }
    .right {
      transform: translateX(-50%);
    }
  }
  .platform-info {
    width: 100%;
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    row-gap: 12px;
    &.show {
      z-index: 100;
      .left,
      .right {
        transform: translateX(0);
        opacity: 1;
      }
    }
    .platforms-title {
      margin-bottom: 16px;
    }
    .left,
    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: all 0.5s;
      opacity: 0;
    }
    .right {
      img {
        height: 260px;
      }
    }
    &.platform-info-miniprogram {
      .left {
        img {
          width: 160px;
          margin-top: 8px;
        }
      }
    }

    &.platform-info-not-select {
      @image-width: 400px;
      opacity: 0;

      .right {
        display: flex;
        justify-content: center;
        width: 100%;
        transition: all 0.5s;
        transform: translateX(calc(50% - @image-width / 2));
        img {
          width: @image-width;
          height: unset;
        }
      }
      &.show {
        opacity: 1;
        .right {
          transform: translateX(0);
        }
      }
    }
    .min-width(400px, {
      .right {
        img {
          height: 180px;
        }
      }
        
      &.platform-info-not-select .right img {
        width: 260px;
      }
    });
  }
}
</style>
