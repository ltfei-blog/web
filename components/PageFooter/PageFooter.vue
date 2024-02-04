<script setup lang="ts">
import { BComment, FooterIconItemClickEvent, Comment, CommentReply } from '@ltfei-blog/blogui'
import { list as listApi } from '~/apis/comment/list'
import { like as likeApi } from '~/apis/comment/like'
import { GoodTwo as IconGoodTwo } from '@icon-park/vue-next'

defineOptions({
  name: 'PageFooter'
})
const props = defineProps<{
  id: number
}>()

const commentRef = ref<HTMLElement | null>(null)

// const { data } = useAsyncData('commentData', () => listApi(props.id))
const res = await listApi(props.id)
const data = ref(res)

const findComment = (
  data: Comment[] | CommentReply[],
  id: number | string
): Comment | CommentReply | undefined => {
  for (const i of data) {
    if (i.id == id) {
      return i
    }
    if (i.reply) {
      const result = findComment(i.reply, id)
      if (result) {
        return result
      }
    }
  }
}

const like = async ({ id, value }: FooterIconItemClickEvent) => {
  const comment = findComment(data.value?.data!, id!)
  if (!comment) {
    return
  }
  !value ? comment.likeCount++ : comment.likeCount--
  comment!.liked = !value

  const { status } = await likeApi(Number(comment.id), !value)
  if (status != 200) {
    !value ? comment.likeCount-- : comment.likeCount++
    comment!.liked = !value
    message.error('点赞失败')
  }
}
</script>

<template>
  <div class="page-footer">
    <h2 ref="commentRef">评论</h2>
    <b-comment :data="data?.data || []" @click-like="like">
      <template #likeIcon="{ row }">
        <!-- 
          todo: bug: 这里服务端先请求了一次，由于没有携带token，相应的都是没点赞，导致客户端渲染时，组件内接收到的是没点赞得数据，没有得到active的状态
         -->
        <icon-good-two v-show="row.liked" theme="filled" class="active" />
        <icon-good-two v-show="!row.liked" />
      </template>
    </b-comment>
  </div>
</template>

<style lang="less" scoped>
.page-footer {
  margin-top: 20px;
}
.i-icon:hover,
.active {
  color: @primary;
}
</style>
