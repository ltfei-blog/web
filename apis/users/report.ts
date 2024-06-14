import request, { Response } from '~/utils/request'

export interface ReportType {
  label: string
  key: number
}

export const getCauseType = (): Response<ReportType[]> => {
  return request({
    url: '/users/report/getCauseType'
  })
}

export const report = (data: {
  type: 'article' | 'comment' | 'user'
  cause: number
  report_id: number
  desc: string
}): Response<void> => {
  return request({
    url: '/users/report/',
    method: 'post',
    data
  })
}
