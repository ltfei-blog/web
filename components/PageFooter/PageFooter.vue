<script setup lang="ts">
import { BComment, BIcon } from '@ltfei-blog/blogui'
import type {
  FooterIconItemClickEvent,
  Comment,
  CommentReply,
  CommentReplyEventFn
} from '@ltfei-blog/blogui'
import { list as listApi } from '~/apis/comment/list'
import { like as likeApi } from '~/apis/comment/like'
import { publish as publishApi } from '~/apis/comment/publish'
import { GoodTwo as IconGoodTwo, MoreOne as IconMore } from '@icon-park/vue-next'
import { useUserStore } from '~/store/user'
import { on } from '~/components/PageSidebar/event'
import { scrollTo } from '~/utils/scrollTo'
import { openReport } from '~/components/Report'

defineOptions({
  name: 'PageFooter'
})
const props = defineProps<{
  id: number
  author: number
}>()

const { user } = useUserStore()
const commentRef = ref()
const commentTitleRef = ref<HTMLElement>()
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

const reply: CommentReplyEventFn = async (e, clearInput) => {
  // 通过回复的id找到主id
  const comment = findComment(data.value?.data!, e.id)

  let replyId = null
  let commentId = null

  if (e.id != 0) {
    replyId = e.id as number
    commentId = comment?.replyCommentId || e.id
  }

  const res = await publishApi({
    articleId: props.id,
    commentId,
    replyId,
    content: e.content
  })
  if (res.status != 200) {
    message.error('评论发送失败')
  }

  clearInput()

  // 发送主评论直接追加到评论列表前面
  if (!e.id) {
    data.value.data.unshift({
      id: res.data.id,
      content: e.content,
      date: Date.now(),
      userId: user.value.id,
      avatar: user.value.avatar,
      username: user.value.username,
      likeCount: 0,
      liked: false,
      // isAuthor: false,
      replyCommentId: 0,
      replyToReplyId: 0,
      replyCount: 0,
      reply: []
    })
  } else {
    // 回复的评论放在reply里面
    // 找到回复的评论的主评论id
    const mainComment = findComment(
      data.value?.data!,
      comment?.replyCommentId || comment?.id
    ) as Comment
    console.log(mainComment)

    mainComment?.reply.push({
      id: res.data.id,
      content: e.content,
      date: Date.now(),
      userId: user.value.id,
      avatar: user.value.avatar,
      username: user.value.username,
      likeCount: 0,
      liked: false,
      // isAuthor: false,
      replyCommentId: 0,
      replyToReplyId: 0,
      replyCount: 0
    })
  }
}

on('toComment', () => {
  if (!commentTitleRef.value) {
    return
  }
  const y = commentTitleRef.value?.offsetTop
  // 留出Nav的高度+边距
  scrollTo(y - 75)
  commentRef.value?.focus()
})
</script>

<template>
  <div class="page-footer">
    <h2 class="title" ref="commentTitleRef">评论</h2>
    <b-comment :data="data?.data || []" @click-like="like" @reply="reply" ref="commentRef">
      <template #user-tag="{ row }">
        <a-tag v-if="row.userId == author" color="#e55">作者</a-tag>
      </template>
      <template #likeIcon="{ row }">
        <!-- 
          todo: bug: 这里服务端先请求了一次，由于没有携带token，相应的都是没点赞，导致客户端渲染时，组件内接收到的是没点赞得数据，没有得到active的状态
         -->
        <icon-good-two v-show="row.liked" theme="filled" class="active" />
        <icon-good-two v-show="!row.liked" />
      </template>
      <template #footer="{ row }">
        <a-tooltip placement="bottom" color="white">
          <template #title>
            <div class="report-content">
              <a-button @click="openReport('comment', Number(row.id))">举报</a-button>
              <!-- <a-button disabled>加入黑名单</a-button> -->
            </div>
          </template>
          <b-icon :size="16">
            <icon-more />
          </b-icon>
        </a-tooltip>
      </template>
    </b-comment>
  </div>
</template>

<style lang="less" scoped>
.page-footer {
  margin-top: 20px;
  .title {
    margin-bottom: 10px;
  }
}
.i-icon:hover,
.active {
  color: @primary;
}
</style>
