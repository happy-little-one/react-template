import { useState, useEffect } from 'react'

interface Config<Item> {
  /**
   * @param queries 初始或静态查询参数
   * @param hasPagination 是否带翻页
   * @param getOns 拉取列表的外部useEffect依赖
   * @param fetchData 拉取列表的函数
   */
  queries: object
  hasPagination: boolean
  getOns: any[]
}

export default <Item>(fetchData: Function, config?: Partial<Config<Item>>) => {
  const { queries: initQueries, getOns = [], hasPagination = true } = config

  const [params, setParams] = useState({
    current: hasPagination ? 1 : undefined,
    ...initQueries,
  })
  const [total, setTotal] = useState(0)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const getData = () => {
    setLoading(true)
    fetchData(params)
      .then(({ list, total }) => {
        setData(list)
        hasPagination && setTotal(total)
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
