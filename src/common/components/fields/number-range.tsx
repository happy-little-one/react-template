import React, { SFC } from 'react'
import { InputNumber, Input } from 'antd'
import { InputNumberProps } from 'antd/es/input-number'

interface Props extends Omit<InputNumberProps, 'value' | 'onChange'> {
  value: [number, number]
  onChange: (value: [number, number]) => void
}

const NumberRange: SFC<Props> = props => {
  const { value = [], onChange, min, ...rest } = props

  return (
    <Input.Group compact>
      <InputNumber
        style={{ width: 80 }}
        placeholder="最小值"
        value={value[0]}
        onChange={val => onChange([+val, value[1]])}
        {...rest}
      />
      <Input
        style={{
          width: 30,
          borderLeft: 0,
          borderRight: 0,
          pointerEvents: 'none',
          background: '#fff',
        }}
        placeholder="~"
        disabled
      />
      <InputNumber
        style={{ width: 80, borderLeft: 0 }}
        placeholder="最大值"
        min={value[0] || min}
        value={value[1]}
        onChange={val => onChange([value[0], +val])}
        {...rest}
      />
    </Input.Group>
  )
}

export default NumberRange
