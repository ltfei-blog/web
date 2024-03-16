import axiosRequest, { type Response } from '~/utils/request'

export interface MemberData {
  id: number
  username: string
  avatar: string
  city?: string
  gender?: string
  register_date: number
  status?: number
  avatar_pendant?: string
  get_likes: number
}

export const getMember = (id?: number): Response<MemberData> => {
  return axiosRequest({
    url: '/users/member/get',
    method: 'post',
    data: {
      id
    }
  })
}
