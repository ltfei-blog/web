import axiosRequest, { type Response } from '~/utils/request'

export const init = (): Response<{
  uuid: string
}> => {
  return axiosRequest({
    url: '/users/login/init'
  })
}

export const qqConnectLogin = (uuid: string) => {
  return axiosRequest({
    url: '/users/login/qqConnect',
    method: 'post',
    params: {
      uuid
    }
  })
}
