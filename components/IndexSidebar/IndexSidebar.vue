<script setup lang="ts">
defineOptions({
  name: 'IndexSidebar'
})
</script>

<template>
  <div class="miniprogram component">
    <img class="image" src="~/assets/gh_e9be314c6626_258.jpg" alt="" />
    <div class="text">
      <div class="title">打开小程序</div>
      <div class="subTitle">手机阅读更方便</div>
    </div>
  </div>
  <div class="footer component">
    <!-- todo: 动态获取 -->
    <div class="copyright">&copy;2021-2024 litfa all rights reserved.</div>
    <a href="https://beian.miit.gov.cn/" target="_blank">豫ICP备2021024510号-3</a>
  </div>
</template>

<style lang="less" scoped>
.component {
  background-color: @bg-color;
  margin: 15px 0;
}
.miniprogram {
  height: 120px;
  display: flex;
  align-items: center;
  .image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 0 20px;
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
.footer {
  background-color: unset;
  div,
  a {
    color: @text-color-secondary;
    font-size: 14px;
  }
}
</style>
