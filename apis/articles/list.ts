import axiosRequest, { type Response } from '~/utils/request'
import { Articles } from '~/types/api'

export const list = (): Response<Articles[]> => {
  return axiosRequest({
    url: '/articles/list',
    method: 'post'
  })
}
