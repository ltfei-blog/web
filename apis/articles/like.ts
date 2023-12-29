import axiosRequest, { type Response } from '~/utils/request'

export const like = (id: number): Response<{ liked: boolean }> => {
  return axiosRequest({
    url: '/articles/like',
    method: 'post',
    data: {
      articles: id
    }
  })
}
