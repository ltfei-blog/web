import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || ''

const axiosRequest = axios.create({
  baseURL: baseURL
})

axiosRequest.interceptors.request.use((config) => {
  let token
  try {
    token = localStorage.getItem('token')
  } catch {
    return config
  }
  if (token && config.headers) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
})

axiosRequest.interceptors.response.use((data) => {
  /**
   * todo: 封装权限 让用户点击时直接跳转登录，而不需要发送请求
   */
  if (data.data.status == 4001) {
    localStorage.removeItem('token')
    const router = useRouter()
    router.replace('/login')
    message.warn('请先登录')
  }
  return data
})

const request = async (AxiosRequestConfig: AxiosRequestConfig<any>) => {
  const { data: res } = await axiosRequest(AxiosRequestConfig)
  return res
}

export type Response<T> = Promise<{
  status: number
  data: T
  msg?: string
}>

export default request
