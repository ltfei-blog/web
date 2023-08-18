<script setup lang="ts">
defineOptions({
  name: 'BNav'
})
</script>

<template>
  <nav class="b-nav">
    <div class="logo">
      <img src="https://www.ltfei.cn/img/logo.d05ba22d.webp" alt="logo" />
    </div>
    <div class="title">Ltfei Blog</div>
  </nav>
</template>

<style lang="less" scoped>
nav.b-nav {
  height: 60px;
  background: #ffffff;
  display: flex;
  align-items: center;
  box-shadow: 0px 2px 10px 0px #00000026;
  box-sizing: border-box;
  padding: 0 10px;
  .logo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .title {
    font-size: 20px;
    font-weight: 500;
  }
}
</style>
