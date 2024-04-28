import axiosRequest, { type Response } from '~/utils/request'
import { Articles } from '~/types/api'

export const list = (count?: number, cursor?: number): Response<Articles[]> => {
  return axiosRequest({
    url: '/articles/list',
    method: 'post',
    data: {
      count,
      cursor
    }
  })
}
