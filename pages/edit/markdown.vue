<script setup lang="ts">
import { ref } from 'vue'
defineOptions({
  name: 'markdownEdit'
})

const text = ref('')
</script>

<template>
  <div class="editor">
    <client-only>
      <!-- todo: 工具栏粘性定位 -->
      <lazy-v-md-editor v-model="text"></lazy-v-md-editor>
    </client-only>
  </div>
</template>

<style lang="less" scoped>
.editor {
  .v-md-editor {
    min-height: 500px;
  }
}
</style>
