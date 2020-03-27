import React, { SFC } from 'react'
import { Tag } from 'antd'

interface Props {
  enums: object
  colors: object
  value: number | string
}

const EnumTag: SFC<Props> = ({ enums, colors, value }) => (
  <Tag color={colors[value]}>{enums[value]}</Tag>
)

export default EnumTag
