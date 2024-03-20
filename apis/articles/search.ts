import axiosRequest, { type Response } from '~/utils/request'
import { Articles } from '~/types/api'

export const search = (keyword: string): Response<Articles[]> => {
  return axiosRequest({
    url: '/articles/search',
    method: 'post',
    data: {
      keyword
    }
  })
}
