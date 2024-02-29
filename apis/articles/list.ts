import axiosRequest, { type Response } from '~/utils/request'

export const list = (): Response<
  {
    id: number
    title: string
    cover?: any
    desc: string
    status: number
    author: number
    create_time: string
    last_edit_time?: any
    likes_count: number
    comments_count: number
    author_data: {
      id: number
      username: string
      password?: any
      avatar: string
      city?: any
      gender?: any
      register_date: string
      last_login_date?: any
      register_ip: string
      status?: any
      avatar_pendant?: any
      wx_openid?: any
      wx_unionid?: any
      qq_openid: string
    }
  }[]
> => {
  return axiosRequest({
    url: '/articles/list',
    method: 'post'
  })
}
