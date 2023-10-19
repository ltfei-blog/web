<script setup lang="ts">
import { User as IconUser } from '@icon-park/vue-next'
import { BAvatar } from '@ltfei-blog/blogui'
import { useUserStore } from '~/store/user'
defineOptions({
  name: 'NavUser'
})

const { isLogin, user } = useUserStore()
</script>

<template>
  <div class="nav-user">
    <client-only>
      <nuxt-link v-if="!isLogin" to="/login" class="to-login-icon">
        <icon-user></icon-user>
      </nuxt-link>
      <template v-else>
        <b-avatar :src="user.avatar"></b-avatar>
      </template>
    </client-only>
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
