import axiosRequest, { type Response } from '~/utils/request'

export const init = (): Response<{
  uuid: string
  loginMethods: string[]
}> => {
  return axiosRequest({
    url: '/users/login/init'
  })
}

export const qqConnectLogin = (
  uuid: string
): Response<{
  qqLoginUrl: string
}> => {
  return axiosRequest({
    url: '/users/login/qqConnect',
    method: 'post',
    data: {
      uuid
    }
  })
}
