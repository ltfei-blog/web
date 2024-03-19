import request, { Response } from '~/utils/request'

export const getUserInfo = (): Response<{
  id: number
  username: string
  avatar: string
  city?: string
  gender: number
  desc: string
  register_date: string
  last_login_date?: any
  status: number
  avatar_pendant?: any
}> => {
  return request({
    url: '/users/userInfo',
    method: 'POST'
  })
}

export const editUserInfo = (data: {
  username?: string
  avatar?: string
  city?: string
  gender?: number
  desc?: string
}): Response<{}> => {
  return request({
    url: '/users/editUserInfo',
    data,
    method: 'POST'
  })
}
