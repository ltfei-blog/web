import axiosRequest, { type Response } from '~/utils/request'

export const init = (): Response<{
  uuid: string
  loginMethods: string[]
}> => {
  return axiosRequest({
    url: '/users/login/init'
  })
}

export const getQqConnectUrl = (
  uuid: string
): Response<{
  qqLoginUrl: string
}> => {
  return axiosRequest({
    url: '/users/login/getQqConnectUrl',
    method: 'post',
    data: {
      uuid
    }
  })
}
export const qqConnectLogin = (
  uuid: string,
  authorizationCode: string
): Response<{
  token: string
  type: 'register' | 'login'
}> => {
  return axiosRequest({
    url: '/users/login/qqConnectLogin',
    method: 'post',
    data: {
      uuid,
      authorizationCode
    }
  })
}
