<script setup lang="ts">
import { BCard } from '@ltfei-blog/blogui'
defineOptions({
  name: 'PageIndex'
})
</script>

<template>
  <!-- card demo -->
  <b-card
    v-for="i in 10"
    :key="i"
    :title="`在typescript中使用顶级await-${i}`"
    desc="参考 背景await表达式是只能包含在async函数中，但有一种情况，需要在顶级(函数外层)使用await，比如需要在某"
    username="XING"
    avatar="https://thirdwx.qlogo.cn/mmopen/vi_32/qNuBAn7WLCxgqheUHPPFSlxof70yo9jWnZPPv8BiaMcxBzekOfQp2uwUOyjzL5DwdCkeawmaUf41sfF1ibgeGoIw/132"
    cover="https://static-1259453062.cos.ap-shanghai.myqcloud.com/user1/20230719201957-%E5%9B%BE%E5%B1%82%200.png"
  ></b-card>
</template>

<style lang="less" scoped>
.b-card {
  margin: 15px;
}
</style>
