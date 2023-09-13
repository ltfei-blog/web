import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || ''

const axiosRequest = axios.create({
  baseURL: baseURL
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
