<script setup lang="ts">
import { init as initApi, getStatus as getStatusApi, loginStatus } from '~/apis/login/login'
import { getQqConnectUrl as qqConnectLoginApi } from '~/apis/login/qqConnectLogin'
import { getQrCode } from '~/apis/login/wxLogin'
import {
  CheckOne as IconCheckOne,
  EmotionUnhappy as IconEmotionUnhappy,
  Attention as IconAttention
} from '@icon-park/vue-next'
import { getUserInfo } from '~/utils/userInfo'

defineOptions({
  name: 'LoginCard'
})
/**
 * 该组件可在 /login 路由中展示，todo: 也可以弹窗形式展示
 */

const qrCode = ref()
const loading = ref(true)
let uuid: string
const loginStatusView = ref<'failed' | 'tips' | 'success' | null>(null)
const message = ref('')
const router = useRouter()

const init = async () => {
  loading.value = true
  loginStatusView.value = null
  message.value = ''

  const { data } = await initApi()
  uuid = data.uuid

  if (data.loginMethods.includes('wx_miniprogram')) {
    await getWxQrcode()
  }
  loading.value = false
}
if (process.client) {
  init()
}

// qq登录
const qqConnectLogin = async () => {
  loading.value = true
  const { data } = await qqConnectLoginApi(uuid!)
  location.href = data.qqLoginUrl
}
// 获取微信小程序码
const getWxQrcode = async () => {
  const res = await getQrCode(uuid!)
  const url = URL.createObjectURL(new Blob([res]))
  nextTick(() => {
    qrCode.value = url
  })
}

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
      clearInterval(interval)
      message.value = '登录成功'
      localStorage.setItem('token', res.data.token!)
      getUserInfo()
      setTimeout(() => {
        router.push('/')
      }, 2000)
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
    <div class="login-card">
      <a-spin class="loading" :spinning="loading">
        <div class="qrcode">
          <h3>微信扫码登录</h3>
          <!-- <img :src="qrCode" alt="" v-if="loginStatusView == null" /> -->
          <a-image
            class="qrcode-image"
            :src="qrCode"
            :preview="false"
            v-if="loginStatusView == null"
          />
          <div class="status login-failed" v-if="loginStatusView == 'failed'">
            <icon-emotion-unhappy theme="outline" size="90" fill="var(--error)" :strokeWidth="6" />
            <span class="message">{{ message }}</span>
            <a-button @click="init" type="primary">刷新</a-button>
          </div>
          <div class="status login-tips" v-if="loginStatusView == 'tips'">
            <icon-attention theme="outline" size="90" fill="var(--warning)" :strokeWidth="6" />
            <span class="message">{{ message }}</span>
          </div>
          <div class="status login-success" v-if="loginStatusView == 'success'">
            <icon-check-one theme="outline" size="90" fill="var(--success)" :strokeWidth="6" />
            <span class="message">{{ message }}</span>
          </div>
        </div>
        <div class="other">
          <h3>其他方式登录</h3>
          <div class="other-method qq" @click="qqConnectLogin">
            <img src="../../assets/01_qq_logo.png" alt="" />
          </div>
        </div>
        <div class="tips">未注册用户将自动注册</div>
      </a-spin>
    </div>
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
  margin: 100px auto;

  .qrcode {
    width: 230px;
    height: 220px;
    display: flex;
    flex-direction: column;
    align-items: center;
    :deep(.qrcode-image) {
      width: 180px;
      height: 180px;
      margin-top: 10px;
    }
    .status {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 25px 0;
      .message {
        margin: 8px 0;
      }
    }
  }
  .other {
    flex: 1;
    margin-top: 20px;
    h3 {
      font-size: 16px;
      font-weight: 500;
      text-align: center;
      color: @text-color-regular;
    }

    .other-method.qq {
      text-align: center;
      background-color: rgb(0, 153, 255);
      width: 80px;
      padding: 5px 10px;
      box-sizing: border-box;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 20px;
      margin: 0 auto;
      margin-top: 5px;
      cursor: pointer;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
  .tips {
    font-size: 12px;
    margin-top: 10px;
    text-align: center;
    color: @text-color-regular;
  }
}
</style>
