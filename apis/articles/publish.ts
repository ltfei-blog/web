import axiosRequest, { type Response } from '~/utils/request'

interface Data {
  title: string
  desc: string
  cover: string
  content: string
  type: 'add' | 'edit'
}

export const publish = (
  data: Data
): Response<
  | {
      audit: false
      id: number
    }
  | {
      audit: true
      auditId: number
    }
> => {
  return axiosRequest({
    url: '/articles/publish',
    method: 'post',
    data
  })
}
