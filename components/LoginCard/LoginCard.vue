<script setup lang="ts">
import { init as initApi } from '~/apis/users/login'
defineOptions({
  name: 'LoginCard'
})
/**
 * 该组件可在 /login 路由中展示，也可以弹窗形式展示
 */

onMounted(async () => {
  const { data: res } = await initApi()
  console.log(res)
})
</script>

<template>
  <div class="login-card">
    <div class="qrcode">
      <h3>微信扫码登录</h3>
      <!-- 临时二维码 -->
      <img src="https://www.ltfei.cn/img/gh_e9be314c6626_258.f7ac864f.jpg" alt="" />
    </div>
    <div class="other">
      <h3>其他方式登录</h3>
      <div class="other-method qq">qq登录</div>
    </div>
    <div class="tips"></div>
  </div>
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
