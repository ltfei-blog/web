<script setup lang="ts">
defineOptions({
  name: 'IndexSidebar'
})
</script>

<template>
  <div class="miniprogram component"></div>
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
