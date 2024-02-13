import axiosRequest, { type Response } from '~/utils/request'

export const publish = (data: {
  content: string
  replyId: number | null
  commentId: number | null
  articleId: number
}): Response<{
  id: number
}> => {
  return axiosRequest({
    url: '/comment/publish',
    method: 'post',
    data
  })
}
