import React from 'react'
import { Link, Route } from 'react-router-dom'
import { Button, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { Goods, GoodsService } from '@/domain/goods'
import { AppTable, ModalForm } from '@/common/components'
import { http } from '@/common/utils'

import Detail from './$id'

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
      <AppTable<Goods>
        rowKey="id"
        fetchData={GoodsService.getGoodsList}
        header={({ onSearch }) => {
          const createOrder = () => {
            ModalForm({
              title: '新建订单',
              schema: Goods.schemas.create,
              onSubmit: (values: Goods) =>
                http.get('order/save', { params: values }).then(() => {
                  message.success('保存成功')
                  onSearch({}) // 新建后，一般要清空查询并回到第一页。
                }),
            })
          }

          return (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={createOrder}
            >
              新增
            </Button>
          )
        }}
        search={{
          defaultValue: {
            orgId: 1, // 静态参数，查询中始终会带的参数
            status: 0, // 初始查询参赛
          },
          schema: Goods.schemas.search,
        }}
        getColumns={({ getData }) => {
          const editOrder = ({ id, name, price }) => {
            ModalForm({
              title: '编辑订单',
              schema: Goods.schemas.create,
              defaultValue: {
                id,
                name,
                price: price / 100,
              },
              onSubmit: (values: Goods) =>
                http.get('order/save', { params: values }).then(() => {
                  message.success('保存成功')
                  getData()
                }),
            })
          }

          return [
            {
              title: '商品名称',
              key: 'name',
              render: it => (
                <>
                  <img src={it.img} className="mr-1" />
                  {it.name}
                </>
              ),
            },
            {
              title: '商品状态',
              dataIndex: 'statusName',
            },
            {
              title: '商品类型',
              dataIndex: 'typeName',
            },
            {
              title: '订单价格',
              dataIndex: 'fixedPrice',
            },
            {
              title: '创建时间',
              dataIndex: 'createdAtString',
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
        }}
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
