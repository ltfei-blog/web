<script setup lang="ts">
defineOptions({
  name: 'ErrorPage'
})

defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="error">
    <h2 class="code">{{ error?.statusCode }}</h2>
    <h2 class="message">{{ error?.message }}</h2>
    <button class="button" @click="handleError">返回首页</button>
  </div>
</template>

<style lang="less" scoped>
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
}
.code {
  font-size: 16px;
  color: #00c16a;
}
.message {
  font-size: 28px;
  margin: 10px 0;
}

.button {
  width: 125px;
  height: 40px;
  background-color: #00c16a;
  border-radius: 10px;
  border: none;
  color: #fff;
}
</style>
