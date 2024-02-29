import axiosRequest, { type Response } from '~/utils/request'

export const details = (
  id: number | string
): Response<{
  id: number
  title: string
  content: string
  cover?: any
  desc: string
  status: number
  author: number
  create_time: number
  last_edit_time?: number
  likes_count: number
  liked: boolean
  comments_count: number
  author_data: {
    id: number
    username: string
    password?: any
    avatar: string
    city?: any
    gender?: any
    register_date: number
    last_login_date?: number
    register_ip: string
    status?: any
    avatar_pendant?: any
    wx_openid?: any
    wx_unionid?: any
    qq_openid: string
  }
}> => {
  return axiosRequest({
    url: `/articles/details/${id}`,
    method: 'post'
  })
}
