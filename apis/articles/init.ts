import axiosRequest, { type Response } from '~/utils/request'

export const init = (): Response<{}> => {
  return axiosRequest({
    url: '/articles/init',
    method: 'post'
  })
}
