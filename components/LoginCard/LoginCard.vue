<script setup lang="ts">
import { init as initApi, getQqConnectUrl as qqConnectLoginApi } from '~/apis/users/login'
import { getQrCode } from '~/apis/users/wxLogin'
defineOptions({
  name: 'LoginCard'
})
/**
 * 该组件可在 /login 路由中展示，todo: 也可以弹窗形式展示
 */

//  初始化登录 获取 uuid
const initData = await useAsyncData('init', () => initApi())
const uuid = initData.data?.value?.data.uuid
const qrCode = ref()
const loading = ref(true)

// qq登录
const qqConnectLogin = async () => {
  const { data } = await qqConnectLoginApi(uuid!)
  location.href = data.qqLoginUrl
}
// 获取微信小程序码
const getWxQrcode = async () => {
  const res = await getQrCode(uuid!)
  qrCode.value = URL.createObjectURL(new Blob([res]))
  loading.value = false
}

if (initData.data?.value?.data.loginMethods.includes('wx_miniprogram')) {
  await getWxQrcode()
}
loading.value = false

// todo: 轮询登录状态
</script>

<template>
  <!-- <a-spin :spinning="loading"> -->
  <div class="login-card">
    <div class="qrcode">
      <h3>微信扫码登录</h3>
      <img :src="qrCode" alt="" />
    </div>
    <div class="other">
      <h3>其他方式登录</h3>
      <div class="other-method qq" @click="qqConnectLogin">qq登录</div>
    </div>
    <div class="tips"></div>
  </div>
  <!-- </a-spin> -->
</template>

<style lang="less" scoped>
.login-card {
  width: 230px;
  background-color: @bg-color;
  border-radius: 10px;
  // margin: 50px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .qrcode {
    width: 230px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 80%;
      margin-top: 10px;
    }
  }
  .other {
    flex: 1;
    margin-top: 20px;
    h3 {
      font-size: 16px;
      font-weight: 500;
      color: @text-color-regular;
    }
    .other-method.qq {
      text-align: center;
    }
  }
}
</style>
