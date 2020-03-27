import reject from 'ramda/es/reject'
import dayjs from 'dayjs'
import { message } from 'antd'

import { BASE_URL } from '../contants'
import http from './http'

/** {1: '已完成‘} => [{ label: '已完成', value: 1 }] */
export const jsonToEnum = (json: object) =>
  Object.keys(json).map(key => ({
    label: json[key],
    value: key,
  }))

/** 分转元(已处理空值情况)： 240 => 2.40 */
export const fenToYuan = (val: number) =>
  isNaN(val) ? undefined : (val / 100).toFixed(2)

/** 日期字符串(已处理空值情况) */
export const toDateString = (val: string) =>
  val ? dayjs(val).format('YYYY-MM-DD HH:mm:ss') : undefined

/** 过滤对象 */
export const clearObj = (obj: object) =>
  reject((val: any) => [undefined, null, NaN, ''].includes(val), obj)

/**
 * 通过接口下载文件
 * @param path 接口地址，内部拼baseUrl
 * @param quries 查询参数
 */
export const downloadFromApi = (path: string, queries: object) => {
  const queryString = Object.keys(queries).map(key => `${key}=${queries[key]}`)
  const url = `${BASE_URL}${path}?${queryString.join('&')}`
  window.location.href = url
  message.success('数据开始下载，请稍后...')
}

/** 通过文件连接下载文件 */
export const downloadFile = (url: string) => {
  const a = document.createElement('a')
  a.href = url
  a.download = url
  a.click()
}

export { http }
