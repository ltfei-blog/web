<script setup lang="ts">
import { User as IconUser } from '@icon-park/vue-next'
defineOptions({
  name: 'NavUser'
})

const isLogin = false
</script>

<template>
  <div class="nav-user">
    <nuxt-link v-if="!isLogin" to="/login" class="to-login-icon">
      <icon-user></icon-user>
    </nuxt-link>
  </div>
</template>

<style lang="less" scoped>
.to-login-icon {
  width: 20px;
  height: 20px;
  color: @text-color;
  border: 1px solid @text-color;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
