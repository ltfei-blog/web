<script setup lang="ts">
defineOptions({
  name: 'UserPageSidebar'
})
</script>

<template>
  <div class="user-page-sidebar">
    <div class="miniprogram component">
      <img class="image" src="~/assets/gh_e9be314c6626_258.jpg" alt="" />
      <div class="text">
        <div class="title">打开小程序</div>
        <div class="subTitle">手机阅读更方便</div>
      </div>
    </div>
    <div class="creator">
      <h1>创作中心</h1>
      <div class="content">快来成为创作者吧～</div>
      <a-button href="/edit" block>开始创作</a-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.user-page-sidebar {
  width: 220px;
  position: sticky;
  top: 10px;
  margin-left: 10px;

  .creator {
    background-color: @bg-color;
    padding: 10px;
    box-sizing: border-box;
    h1 {
      font-size: 16px;
    }
    .content {
      font-size: 16px;
      margin: 8px 0;
    }
  }
  .miniprogram {
    height: 100px;
    display: flex;
    align-items: center;
    background-color: @bg-color;
    margin-bottom: 10px;

    .image {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin: 0 8px;
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .subTitle {
        color: @text-color-regular;
        margin-top: 8px;
      }
    }
  }
}
</style>
