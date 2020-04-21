import React, { SFC, useState, useEffect } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Button, Table } from 'antd'
import { LeftOutlined } from '@ant-design/icons'

import { Goods, GoodsService } from '@/domain/goods'
import { Detail, ImgPreview } from '@/common/components'
import { http } from '@/common/utils'

const OrderDetail: SFC<RouteComponentProps> = ({ match }) => {
  const [items, setItems] = useState([])
  const [title, setTitle] = useState<string>(undefined)

  useEffect(() => {
    const { params } = match
    http.get('/orders/id', { params }).then(res => {
      const order: Goods = res.data
      const { id, name, typeName, statusName, fixedPrice } = order
      setTitle(`订单${id}`)
      setItems([
        {
          title: '订单信息',
          items: [
            {
              title: '订单id',
              value: id,
            },
            {
              title: '商品名称',
              value: name,
            },
            {
              title: '订单状态',
              value: statusName,
            },
            {
              title: '订单来源',
              value: typeName,
            },
            {
              title: '商品主图',
              value: (
                <a onClick={() => ImgPreview('//via.placeholder.com/800')}>
                  预览图片
                </a>
              ),
            },
            {
              title: '订单价格',
              value: fixedPrice,
            },
            {
              title: '订单描述',
              value: desc,
            },
          ],
        },
        {
          title: '商品信息',
          value: <Table pagination={false} />,
        },
      ])
    })
  }, [])

  return (
    <>
      <div className="page-header">
        <div className="flex justify-between items-end">
          <h2 className="page-title">{title}</h2>
          <div>
            <Link to="/basic/list">
              <Button type="primary" icon={<LeftOutlined />}>
                返回
              </Button>
            </Link>
          </div>
        </div>
        这是一条页面描述
      </div>

      <div className="p-3">
        <Detail items={items} />
      </div>
    </>
  )
}

export default OrderDetail
