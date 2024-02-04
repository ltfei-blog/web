import axiosRequest, { type Response } from '~/utils/request'
import type { Comment } from '@ltfei-blog/blogui'

export const list = (articleId: number): Response<Comment[]> => {
  return axiosRequest({
    url: '/comment/list',
    method: 'post',
    data: {
      articleId
    }
  })
}
