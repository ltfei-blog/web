import axiosRequest, { type Response } from '~/utils/request'

export const init = (
  type: 'edit' | 'add',
  editId?: number
): Response<{
  edit?: {
    id: number
    title: string
    content: string
    cover: string
    desc: string
    /**
     * - 1 普通草稿
     * - 2 已提交审核
     */
    status: number
    author: number
    create_time: number
    last_edit_time: number
    type: 'edit' | 'add'
    articles_id: number
  }
  article?: {
    id: number
    title: string
    content: string
    cover: string
    desc: string
    /**
     * - 1 正常
     */
    status: number
    author: number
    create_time: number
    last_edit_time: number
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
