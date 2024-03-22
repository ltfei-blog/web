<script setup lang="ts">
import { Star as IconStar, History as IconHistory, Tips as IconTips } from '@icon-park/vue-next'

defineOptions({
  name: 'BNav'
})

const keyword = ref('')
</script>

<template>
  <nav class="b-nav">
    <nuxt-link to="/" class="left-entry">
      <div class="logo">
        <img src="https://www.ltfei.cn/img/logo.d05ba22d.webp" alt="logo" />
      </div>
      <div class="title">Ltfei Blog</div>
    </nuxt-link>
    <div class="right-entry">
      <search-input v-if="$route.path != '/search'" class="search" v-model:keyword="keyword" />
      <nav-user />
      <!-- todo: 制作对应页面 修改链接 -->
      <nuxt-link to="/user" class="icon-item">
        <IconStar size="23" />
        收藏
      </nuxt-link>
      <!-- todo: 制作对应页面 修改链接 -->
      <nuxt-link to="/user" class="icon-item">
        <IconHistory size="20" />
        历史
      </nuxt-link>
      <!-- todo: 制作对应页面 修改链接 -->
      <nuxt-link to="/user" class="icon-item">
        <IconTips size="22" />
        创作中心
      </nuxt-link>

      <nuxt-link to="/edit">
        <a-button type="primary">投稿</a-button>
      </nuxt-link>
    </div>
  </nav>
</template>

<style lang="less" scoped>
nav.b-nav {
  height: 60px;
  background: @bg-color;
  box-shadow: 0px 2px 10px 0px @black-opacity-1;
  box-sizing: border-box;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  .left-entry,
  .right-entry {
    display: flex;
    align-items: center;
    .search {
      width: 260px;
      z-index: 300;
    }
  }
  .left-entry {
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
    .title {
      font-size: 20px;
      font-weight: 500;
      color: @text-color;
    }
  }

  .icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    // margin: 0 10px;
    margin-right: 20px;
  }
}
</style>
