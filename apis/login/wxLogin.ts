import axiosRequest from '~/utils/request'

export const getQrCode = (uuid: string): Promise<Buffer> => {
  return axiosRequest({
    url: '/login/wxLogin/getQrCode',
    method: 'post',
    responseType: 'arraybuffer',
    data: {
      uuid
    }
  })
}
