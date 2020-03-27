import { message } from 'antd'
import axios, { AxiosResponse } from 'axios'

import { BASE_URL } from '../contants'

interface Success {
  success: true
  data?: any
}

interface Failed {
  success: false
  code: number
  msg: string
}

type Response = Success | Failed

const http = axios.create({ baseURL: BASE_URL })

http.interceptors.response.use(
  (res: AxiosResponse<any>) => {
    const { success, code, msg } = res.data

    if (success) {
      return res.data
    }

    if (code === 401) {
      location.href = '/#/login'
      return Promise.reject()
    }

    message.error(msg || '服务端出错')
    return Promise.reject()
  },
  err => {
    message.error(err.message)
    return Promise.reject()
  },
)

http.get

export default http
