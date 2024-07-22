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
  name: 'PageSidebar'
})

const props = defineProps<Props>()
const emit = defineEmits(['update:likes', 'update:liked'])

const { likes, liked, like, show } = usePageSidebar(props, emit)
</script>

<template>
  <div class="sidebar-container">
    <div class="sidebar" :class="{ show }">
      <div class="box">
        <div class="like item" :class="liked ? 'liked' : ''" @click="like">
          <icon-good-two size="26"></icon-good-two>
          <div class="text">{{ likes }}</div>
        </div>
        <div class="comment item" @click="emitEvent('toComment')">
          <icon-comment size="26"></icon-comment>
          <div class="text">{{ comments }}</div>
        </div>
        <div class="comment item" @click="openReport('article', id)">
          <icon-report size="26"></icon-report>
          <div class="text">举报</div>
        </div>
        <!-- <div class="love"></div> -->
      </div>
      <a-back-top />
    </div>
  </div>
</template>

<style lang="less" scoped>
.sidebar-container {
  max-width: 950px;
  padding: 0 10px;
  box-sizing: border-box;

  position: fixed;
  top: 70vh;
  left: 0;
  right: 0;
  margin: auto;

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  pointer-events: none;
  .sidebar {
    opacity: 0;
    transition: all 0.1s;
    &.show {
      opacity: 1;
      transition: all 0.3s;
    }
  }
  .box {
    pointer-events: all;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;

    background-color: @bg-color;
    width: 50px;
    // height: 100px;
    padding: 10px 0;
    border-radius: 10px;
    margin-bottom: 12px;
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05);
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 8px 0;
      cursor: pointer;
      user-select: none;
      &:hover {
        color: @primary;
      }
      .text {
        font-size: 14px;
      }
      &.liked .i-icon :deep(path) {
        fill: @primary;
        stroke: @primary;
        animation: liked 0.3s;
        transform-origin: center;
      }
      @keyframes liked {
        0% {
          transform: scale(1);
        }
        45% {
          transform: scale(0.8);
        }
        100% {
          transform: scale(1);
        }
      }
    }
  }
}
</style>
