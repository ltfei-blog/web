import axiosRequest, { type Response } from '~/utils/request'

export const init = (
  type: 'edit' | 'add',
  editId?: number
): Response<{
  edit: {
    articles_id: number
    author: number
    content: string
    cover: string
    create_time: number
    desc: string
    last_edit_time: number
    title: string
    type: 'edit' | 'add'
  }
}> => {
  return axiosRequest({
    url: '/articles/init',
    method: 'post',
    data: {
      type,
      editId
    }
  })
}
