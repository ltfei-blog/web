<script setup lang="ts">
defineOptions({
  name: 'EditUserInfo'
})

const open = ref(false)
const showModal = () => {
  open.value = true
}

const handleOk = () => {
  open.value = false
}
</script>

<template>
  <div class="edit-user-info">
    <div @click="showModal">
      <slot />
    </div>
    <a-modal v-model:open="open" title="修改信息" @ok="handleOk" :footer="null">
      <EditUserInfoForm @handle-ok="handleOk" />
    </a-modal>
  </div>
</template>

<style lang="less" scoped></style>
