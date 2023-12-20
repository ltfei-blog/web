import axiosRequest, { type Response } from '~/utils/request'

interface Data {
  filename: string
  path: string
  url: string
}
export const uploadCover = (file: File): Response<Data> => {
  return axiosRequest({
    url: '/articles/upload',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: {
      file
    }
  })
}

export const uploadArticles = (file: File): Response<Data> => {
  return axiosRequest({
    url: '/articles/cover/upload',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: {
      file
    }
  })
}
