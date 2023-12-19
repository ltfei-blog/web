import axiosRequest, { type Response } from '~/utils/request'

interface Data {
  title: string
  desc?: string
  cover?: string
  content: string
  type: 'add' | 'edit'
  editId?: number
}
export const save = (data: Data): Response<{}> => {
  return axiosRequest({
    url: '/articles/save',
    method: 'post',
    data
  })
}
