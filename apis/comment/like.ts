import axiosRequest, { type Response } from '~/utils/request'
import type { Comment } from '@ltfei-blog/blogui'

export const like = (commentId: number, like: boolean): Response<Comment[]> => {
  return axiosRequest({
    url: '/comment/like',
    method: 'post',
    data: {
      commentId,
      like
    }
  })
}
