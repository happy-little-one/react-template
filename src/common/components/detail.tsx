import React, { SFC, ReactNode } from 'react'
import { Card, Col, Row, Skeleton } from 'antd'

interface SubItem {
  title: string
  value: ReactNode
  span?: number
}

interface Item {
  title: string
  value?: ReactNode
  items?: SubItem[]
}

const Detail: SFC<{ items?: Item[] }> = ({ items }) => {
  const content = items.map(({ title, value, items }) => (
    <Card className="mb-3" key={title} title={title}>
      {value ? (
        value
      ) : (
        <Row key={title} gutter={8}>
          {items.map(({ title, value, span = 8 }) => (
            <Col className="mb-2" key={title} span={span}>
              <div style={{ marginBottom: 4 }}>{title}:</div>
              <div className="text-gray-900">{value}</div>
            </Col>
          ))}
        </Row>
      )}
    </Card>
  ))

  return <>{items ? content : <Skeleton />}</>
}

export default Detail
