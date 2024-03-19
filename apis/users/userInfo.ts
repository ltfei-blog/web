import request, { Response } from '~/utils/request'

export const getUserInfo = (): Response<{
  id: number
  username: string
  avatar: string
  city?: any
  gender?: any
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
