<script setup lang="ts">
import {
  GoodTwo as IconGoodTwo,
  Comment as IconComment,
  Caution as IconReport
} from '@icon-park/vue-next'
import { emit as emitEvent } from './event'
import { openReport } from '~/components/Report'
import { usePageSidebar, type Props } from './usePageSidebar'

defineOptions({
  name: 'PageSidebarMobile'
})

const props = defineProps<Props>()
const emit = defineEmits(['update:likes', 'update:liked'])

const { likes, liked, like } = usePageSidebar(props, emit)
</script>

<template>
  <div class="sidebar-mobile">
    <a-input placeholder="开发中......" class="input" disabled></a-input>
    <div class="like item" :class="liked ? 'liked' : ''" @click="like">
      <icon-good-two size="20"></icon-good-two>
      <div class="text">{{ likes }}</div>
    </div>
    <div class="comment item" @click="emitEvent('toComment')">
      <icon-comment size="20"></icon-comment>
      <div class="text">{{ comments }}</div>
    </div>
    <div class="comment item" @click="openReport('article', id)">
      <icon-report size="20"></icon-report>
      <div class="text">举报</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.sidebar-mobile {
  background-color: @bg-color;
  width: 100%;
  height: 55px;
  position: sticky;
  bottom: 0;
  border-top: 1px solid @text-color-placeholder;

  display: flex;
  justify-content: space-around;
  align-items: center;

  .input {
    width: 50%;
  }
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
  }
}
</style>
