<script setup lang="ts">
import { GoodTwo as IconGoodTwo, Comment as IconComment } from '@icon-park/vue-next'
import { like as likeApi } from '~/apis/articles/like'
defineOptions({
  name: 'PageSidebar'
})

const props = defineProps<{
  id: number
  likes: number
  liked: boolean
  comments: number
}>()

const data = reactive({
  id: props.id,
  likes: props.likes,
  liked: props.liked
})
const like = async () => {
  !data.liked ? data.likes++ : data.likes--

  data.liked = !data.liked
  const res = await likeApi(props.id)
  if (res.status != 200) {
    data.liked = res.data?.liked || !data.liked
    return message.error('点赞失败')
  }
}
</script>

<template>
  <div class="sidebar-container">
    <div class="sidebar">
      <div class="box">
        <div class="like item" :class="data.liked ? 'liked' : ''" @click="like">
          <icon-good-two size="26"></icon-good-two>
          <div class="text">{{ data.likes }}</div>
        </div>
        <div class="comment item">
          <icon-comment size="26"></icon-comment>
          <div class="text">{{ comments }}</div>
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
