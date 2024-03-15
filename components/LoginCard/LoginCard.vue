<script setup lang="ts">
import {
  init as initApi,
  getQqConnectUrl as qqConnectLoginApi,
  getStatus as getStatusApi,
  loginStatus
} from '~/apis/users/login'
import { getQrCode } from '~/apis/users/wxLogin'
import {
  CheckOne as IconCheckOne,
  EmotionUnhappy as IconEmotionUnhappy,
  Attention as IconAttention
} from '@icon-park/vue-next'

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
  const url = URL.createObjectURL(new Blob([res]))
  nextTick(() => {
    qrCode.value = url
    console.log(qrCode.value)
  })

  loading.value = false
}

if (process.client && initData.data?.value?.data.loginMethods.includes('wx_miniprogram')) {
  await getWxQrcode()
}

const loginStatusView = ref<'failed' | 'tips' | 'success' | null>(null)
const message = ref('')
const getStatus = async () => {
  const res = await getStatusApi(uuid!)
  const status = res.data.status

  const callbacks = {
    [loginStatus.notLogin]: () => {
      loginStatusView.value = null
      message.value = ''
    },
    [loginStatus.scanCode]: () => {
      loginStatusView.value = 'tips'
      message.value = '扫码成功，请在手机确认登录'
    },
    [loginStatus.getQqConnectUrl]: () => {
      loginStatusView.value = 'tips'
      message.value = '请在新页面继续完成登录'
    },
    [loginStatus.loginSucceed]: () => {
      loginStatusView.value = 'success'
      message.value = '登录成功'
      clearInterval(interval)
    },
    [loginStatus.loginFailedUserCancel]: () => {
      loginStatusView.value = 'failed'
      message.value = '登录失败，已取消登录'
      clearInterval(interval)
    },
    /**
     * 登录超时
     * todo: 超时直接刷新二维码
     */
    [loginStatus.loginFailedTimeout]: () => {
      loginStatusView.value = 'failed'
      message.value = '登录超时'
      clearInterval(interval)
    },
    [loginStatus.loginFailedOtherCause]: () => {
      loginStatusView.value = 'failed'
      message.value = '登录失败'
      clearInterval(interval)
    }
  }

  callbacks[status]()
}
let interval: NodeJS.Timer
if (process.client) {
  interval = setInterval(() => {
    getStatus()
  }, 2000)

  onUnmounted(() => {
    clearInterval(interval)
  })
}
</script>

<template>
  <client-only>
    <a-spin :spinning="loading">
      <div class="login-card">
        <div class="qrcode">
          <h3>微信扫码登录</h3>
          <img :src="qrCode" alt="" v-if="loginStatusView == null" />
          <div class="status login-failed" v-if="loginStatusView == 'failed'">
            <icon-emotion-unhappy
              theme="outline"
              size="90"
              fill="var(--success)"
              :strokeWidth="6"
            />
            {{ message }}
          </div>
          <div class="status login-tips" v-if="loginStatusView == 'tips'">
            <icon-attention theme="outline" size="90" fill="var(--success)" :strokeWidth="6" />
            {{ message }}
          </div>
          <div class="status login-success" v-if="loginStatusView == 'success'">
            <icon-check-one theme="outline" size="90" fill="var(--success)" :strokeWidth="6" />
            {{ message }}
          </div>
        </div>
        <div class="other">
          <h3>其他方式登录</h3>
          <div class="other-method qq" @click="qqConnectLogin">qq登录</div>
        </div>
        <div class="tips"></div>
      </div>
    </a-spin>
  </client-only>
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
    .status {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 25px 0;
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
