import axiosRequest from '~/utils/request'

export const getQrCode = (uuid: string): Promise<Buffer> => {
  return axiosRequest({
    url: '/users/wxLogin/getQrCode',
    method: 'post',
    responseType: 'arraybuffer',
    data: {
      uuid
    }
  })
}
