import axiosRequest, { type Response } from '~/utils/request'
import { Articles } from '~/types/api'

export interface MemberData {
  id: number
  username: string
  avatar: string
  city?: string
  gender: number
  desc: string
  register_date: number
  status?: number
  avatar_pendant?: string
  get_likes: number
  followers: number
  following: number
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

export interface PostData {
  id: number
  title: string
  cover?: string
  desc: string
  status: number
  author: number
  create_time: number
  last_edit_time?: number
  likes_count: number
  comments_count: number
}
export const getPost = (id?: number): Response<PostData[]> => {
  return axiosRequest({
    url: '/users/member/getPost',
    method: 'post',
    data: {
      id
    }
  })
}

export interface LikesData {
  id: number
  articles: number
  liked: boolean
  user: number
  create_time: number
  last_edit_time: number
  likes_count: number
  comments_count: number
  user_likes_data: Articles
}

export const getLikes = (): Response<LikesData[]> => {
  return axiosRequest({
    url: '/users/member/getLikes',
    method: 'post',
    data: {
      // id
    }
  })
}
