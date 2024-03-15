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

export const loginStatus = {
  /**
   * 未登录
   */
  notLogin: 0,
  /**
   * 已扫码
   */
  scanCode: 1,
  /**
   * 已获取qq互联登录url 已创建登录地址
   */
  getQqConnectUrl: 2,
  /**
   * 登录成功
   */
  loginSucceed: 10,
  /**
   * 登录失败(用户取消登录)
   */
  loginFailedUserCancel: 20,
  /**
   * 登录失败(其他原因)
   */
  loginFailedOtherCause: 21,
  /**
   * 登录失败(登录超时) (不在数据库体现，仅返回数据时判断时间)
   */
  loginFailedTimeout: 22
}

export const getStatus = (uuid: string): Response<{ status: number }> => {
  return axiosRequest({
    url: '/users/login/getStatus',
    method: 'post',
    data: {
      uuid
    }
  })
}
