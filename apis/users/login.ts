import request from '~/utils/request'

export const init = () => {
  return request({
    url: '/users/login/init'
  })
}
