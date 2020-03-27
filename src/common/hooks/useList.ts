import { useState, useEffect } from 'react'

import { http } from '@/common/utils'

interface Config<Item> {
  /**
   * @param queries 初始或静态查询参数
   * @param hasPagination 是否带翻页
   * @param getOns 拉取列表的外部useEffect依赖
   * @param pageKey 传给后端当前页的字段名
   * @param formatResponse 转换后端的数据
   */
  queries: object
  hasPagination: boolean
  getOns: any[]
  pageKey: string
  formatResponse: (res: Response.List<Item>) => { data: Item[]; total?: number }
}

export default <Item>(url: string, config?: Partial<Config<Item>>) => {
  const {
    queries: initQueries,
    getOns = [],
    hasPagination = true,
    pageKey = 'currentPage',
    formatResponse = res => ({
      data: res.data.rows,
      total: res.data.totalCount,
    }),
  } = config

  const [params, setParams] = useState({
    current: hasPagination ? 1 : undefined,
    ...initQueries,
  })
  const [total, setTotal] = useState(0)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const getData = () => {
    setLoading(true)
    const { current, ...rest } = params

    http
      .get(url, {
        params: {
          [pageKey]: hasPagination ? current : undefined,
          ...rest,
        },
      })
      .then(res => {
        const { data, total } = formatResponse(res)
        setData(data)
        if (hasPagination) {
          setTotal(total)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(getData, [params, ...getOns])

  const onSearch = (queries: object) => {
    setParams({ ...params, ...queries, current: hasPagination ? 1 : undefined })
  }

  const { current, ...queries } = params

  return {
    loading,
    data,
    pagination: {
      current,
      pageSize: 20,
      total,
      onChange: (current: number) => {
        setParams({ ...params, current })
      },
    },
    queries,
    params,
    getData,
    onSearch,
  }
}
