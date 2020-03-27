import React from 'react'
import { Link, Route } from 'react-router-dom'
import { Button, message } from 'antd'
import { PlusOutlined, ExportOutlined, ImportOutlined } from '@ant-design/icons'
import { ColumnProps } from 'antd/es/table'

import { AppTable, ModalForm, SingleUpload, EnumTag } from '@/common/components'
import { Deps, searchProps } from '@/common/components/app-table'
import { http, jsonToEnum, fenToYuan } from '@/common/utils'

import Detail from './$id'
import { enums, Order } from './common'

// AppTable：封装了大部分业务场景下的表格操作。
// 适用于查询表格，查询无翻页，翻页无查询，无翻页无查询，根据需要选择性的传入参数即可；

// 基本使用为传入一个url，传一个查询的schema， 传一个返回columns的函数即可；
// 可能用到的函数(如拉取列表)会以依赖注入的方式传回来；
// props继承antd的TableProps,基本无损封装。

//查询参数，继承ISchemaAntForm,不传则无搜索
const search: searchProps = {
  defaultValue: {
    orgId: 1, // 静态参数，查询中始终会带的参数
    status: 0, // 初始查询参赛
  },
  schema: {
    name: {
      title: '订单名称',
      type: 'string',
    },
    price: {
      title: '价格区间',
      type: 'number-range',
    },
    status: {
      title: '订单状态',
      type: 'number',
      enum: [{ label: '全部', value: 0 }, ...jsonToEnum(enums.status)],
    },
  },
}

// 创建的schema
const schema = {
  name: {
    title: '订单名称',
    type: 'string',
    required: true,
  },
  price: {
    title: '订单价格',
    type: 'string',
    required: true,
  },
}

// columns, 需要的依赖会注入进来
const getColumns = ({ getData }: Deps<Order>) => {
  // ModalForm: 弹窗表单，使用类似Modal.info, onSubmit需返回一个Promise供内部自动处理loading和打开关闭。
  const editOrder = ({ id, name, price }) => {
    ModalForm({
      title: '编辑订单',
      schema,
      defaultValue: {
        id,
        name,
        price: price / 100,
      },
      onSubmit: (values: Order) =>
        http.get('order/save', { params: values }).then(() => {
          message.success('保存成功')
          getData()
        }),
    })
  }

  const columns: ColumnProps<Order>[] = [
    {
      title: '商品名称',
      dataIndex: 'name',
    },
    {
      title: '订单类型',
      dataIndex: 'type',
      render: val => enums.type[val],
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      render: val => (
        <EnumTag value={val} enums={enums.status} colors={enums.statusColor} />
      ),
    },
    {
      title: '订单价格',
      dataIndex: 'price',
      render: fenToYuan,
    },
    {
      title: '订单描述',
      dataIndex: 'desc',
    },
    {
      title: '操作',
      dataIndex: 'id',
      render: (id, it) => (
        <>
          <a className="mr-1" onClick={() => editOrder(it)}>
            编辑
          </a>
          <Link to={`/basic/list/${id}`}>详情</Link>
        </>
      ),
    },
  ]

  return columns
}

// 表格头部，一般用来放操作按钮(新建，导出等)，不传则无header
const TableHeader = ({ onSearch }) => {
  const createOrder = () => {
    ModalForm({
      title: '新建订单',
      schema,
      onSubmit: (values: Order) =>
        http.get('order/save', { params: values }).then(() => {
          message.success('保存成功')
          onSearch({}) // 新建后，一般要清空查询并回到第一页。
        }),
    })
  }

  return (
    <>
      <Button
        className="mr-1"
        type="primary"
        icon={<PlusOutlined />}
        onClick={createOrder}
      >
        新增
      </Button>

      <Button className="mr-1" type="primary" icon={<ExportOutlined />}>
        导出
      </Button>

      <SingleUpload action="/upload" accept="image/*" onLoaded={console.log}>
        {loading => (
          <Button type="primary" icon={<ImportOutlined />} loading={loading}>
            导入
          </Button>
        )}
      </SingleUpload>
    </>
  )
}

const List = () => (
  <>
    <div className="page-header">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="page-title">搜索列表</h2>
          这是一段页面描述
        </div>
        <div>
          <Button type="primary" className="mr-1">
            主操作1
          </Button>
          <Button type="primary">主操作2</Button>
        </div>
      </div>
    </div>

    <div className="p-3">
      <AppTable<Order>
        rowKey="id"
        url="/orders/list"
        header={TableHeader}
        search={search}
        getColumns={getColumns}
        hasPagination={true} // 默认为true，传false则无翻页
      />
    </div>
  </>
)

export default () => (
  <>
    <Route path="/basic/list" exact component={List} />
    <Route path="/basic/list/:id" component={Detail} />
  </>
)
