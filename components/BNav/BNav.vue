<script setup lang="ts">
import {
  // Star as IconStar,
  Like as IconLike,
  History as IconHistory,
  Tips as IconTips,
  Search as IconSearch
} from '@icon-park/vue-next'

defineOptions({
  name: 'BNav'
})

const keyword = ref('')
</script>

<template>
  <nav class="b-nav">
    <nuxt-link to="/" class="left-entry">
      <div class="logo">
        <img src="assets/logo.webp" alt="logo" />
      </div>
      <div class="title">Ltfei Blog</div>
    </nuxt-link>
    <div class="right-entry">
      <div class="search" v-if="$route.path != '/search'">
        <search-input class="search-input" v-model:keyword="keyword" />
        <nuxt-link to="/search?w=" class="search-icon">
          <icon-search size="26" />
        </nuxt-link>
      </div>
      <nav-user />
      <!-- todo: 制作收藏页面 修改链接 -->
      <nuxt-link to="/user#like" class="icon-item">
        <IconLike size="21" />
        <!-- <IconStar size="23" /> -->
        <span class="text">喜欢</span>
      </nuxt-link>
      <nuxt-link to="/user#history" class="icon-item">
        <IconHistory size="20" />
        <span class="text">历史</span>
      </nuxt-link>
      <!-- todo: 制作对应页面 修改链接 -->
      <nuxt-link to="/user" class="icon-item">
        <IconTips size="22" />
        <span class="text">创作中心</span>
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
  flex-shrink: 0;
  .left-entry,
  .right-entry {
    display: flex;
    align-items: center;
    .search {
      .search-input {
        width: 260px;
      }
      .search-icon {
        display: none;
        padding: 20px;
        cursor: pointer;
      }
      .min-width(750px, {
        .search-input {
          display: none;
        }
        .search-icon {
          display: block;
        }
      });
      .min-width(600px, {
        .search-icon {
          display: block;
          padding: 10px;
        }
      });
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

  .icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    // margin: 0 10px;
    margin-right: 20px;
    .min-width(560px, {
      span.text {
        background-color: red;
        display: none
      }
    });
    .min-width(495px, {
      display: none;
      // margin-right: 10px;
    });
  }
}
</style>
