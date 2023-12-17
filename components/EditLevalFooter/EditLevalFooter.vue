<script setup lang="ts">
defineOptions({
  name: 'EditLevalFooter'
})
/**
 * 编辑页面通过路由离开页面时的保存草稿提醒
 */

const emit = defineEmits<{
  close: [value: 'onlyClose' | 'saveAndClose' | 'cancel']
}>()

const loading = ref(false)
const saveAndClose = () => {
  loading.value = true
  emit('close', 'saveAndClose')
}
</script>

<template>
  <a-space class="footer">
    <a-button @click="$emit('close', 'onlyClose')" danger>直接关闭</a-button>
    <a-button @click="saveAndClose" type="primary" :loading="loading">保存并关闭</a-button>
    <a-button @click="$emit('close', 'cancel')">取消</a-button>
  </a-space>
</template>

<style lang="less" scoped>
.footer {
  margin-top: 10px;
  margin-left: auto;
}
</style>
