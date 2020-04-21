import React, { useState, useEffect, SFC } from 'react'
import { Table, Divider } from 'antd'
import { TableProps, ColumnType } from 'antd/es/table'

import Search, { SearchProps } from './search'
import { useList } from '../hooks'

export interface Deps<Item> {
  /**
   * @param getData 拉列表函数
   * @param queires 当前查询参数，可以用来作数据导出
   * @param data 当前列表数据
   * @param onSearch 查询函数，一般用于新建后回到第一页 onSearch({})
   */
  queries: object
  data: Item[]
  getData: () => void
  onSearch: (params: object) => void
}

export type searchProps = Omit<SearchProps, 'onSearch'>

interface Props<Item> extends TableProps<Item> {
  /**
   * 注入为 { data, queries, getData, onSearch }
   *
   * @param url 列表接口
   * @param header 表格头，一般放操作按钮，带注入，须返回组件
   * @param hasPagination 是否带翻页
   * @param searchProps 查询form参数，继承自IAntdSchemaFormProps, 不传则无搜索
   * @param getColumns 带注入，需返回columns
   * @param getOns 拉取列表的外部依赖，这些值变动时会重新拉取列表
   *
   * 其他继承自antd TableProps
   */
  header?: SFC<Deps<Item>>
  hasPagination?: boolean
  search?: searchProps
  getColumns: (deps: Deps<Item>) => ColumnType<Item>[]
  getOns?: any[]
  fetchData: Function
}

const AppTable = <Item extends object>(props: Props<Item>) => {
  const {
    header,
    search,
    hasPagination,
    getColumns,
    getOns,
    fetchData,
    className = 'page-card',
    ...rest
  } = props

  const { queries, data, pagination, loading, getData, onSearch } = useList<
    Item
  >(fetchData, {
    queries: (search || {}).defaultValue,
    hasPagination,
  })

  const deps = { queries, data, getData, onSearch } as Deps<Item>

  return (
    <div className={className}>
      {search && (
        <>
          <Search {...search} onSearch={onSearch} />
          <Divider dashed />
        </>
      )}

      {header && <div className="mb-1">{header(deps)}</div>}

      <Table<Item>
        dataSource={data}
        loading={loading}
        columns={getColumns(deps)}
        pagination={pagination}
        {...rest}
      />
    </div>
  )
}

export default AppTable
