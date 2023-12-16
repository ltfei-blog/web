<script setup lang="ts">
defineOptions({
  name: 'EditLevalFooter'
})
/**
 * 编辑页面通过路由离开页面时的保存草稿提醒
 */
</script>

<template>
  <a-space class="footer">
    <a-button danger>直接关闭</a-button>
    <a-button type="primary">保存并关闭</a-button>
    <a-button>取消</a-button>
  </a-space>
</template>

<style lang="less" scoped>
.footer {
  margin-top: 10px;
  margin-left: auto;
}
</style>
