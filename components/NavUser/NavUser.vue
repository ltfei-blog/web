<script setup lang="ts">
import { User as IconUser } from '@icon-park/vue-next'
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
        <icon-user size="20"></icon-user>
      </nuxt-link>
      <nuxt-link v-else :to="`/user/${user.id}`">
        <NavUserDetail
          :src="user.avatar"
          :get_likes="user.get_likes"
          :followers="user.followers"
          :following="user.following"
          :username="user.username"
        />
      </nuxt-link>
    </client-only>
  </div>
</template>

<style lang="less" scoped>
.nav-user {
  display: flex;
  align-items: center;
}
.to-login-icon {
  width: 30px;
  height: 30px;
  margin-right: 20px;
  color: @text-color;
  border: 1px solid @text-color;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
