<script setup lang="ts">
import { qqConnectLogin } from '~/apis/users/login'
import { getUserInfo } from '~/utils/userInfo'
defineOptions({
  name: 'qqAccessCallback'
})

const route = useRoute()
const router = useRouter()

const login = async () => {
  const { code: authorizationCode, state: uuid } = route.query
  const { status, msg, data } = await qqConnectLogin(uuid as string, authorizationCode as string)
  if (status !== 200) {
    return message.error(status + ' 登录失败 ' + (msg || ''))
  }
  localStorage.setItem('token', data.token)
  getUserInfo()
  message.success('登录成功')
  router.push('/')
}
if (process.client) {
  login()
}
</script>

<template>
  <client-only>
    <div class="loading-box">
      <div class="loading" v-loading="true"></div>
      正在登录，请稍后...
    </div>
  </client-only>
</template>

<style lang="less" scoped>
.loading-box {
  margin: 0 auto;
  margin-top: 180px;
  width: 260px;
  padding: 30px;
  background-color: @bg-color;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  .loading {
    width: 50px;
    height: 50px;
    background-color: #aaa;
  }
}
</style>
