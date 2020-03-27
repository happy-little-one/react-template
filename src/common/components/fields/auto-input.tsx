import React, { SFC, useState, useEffect } from 'react'
import { Select } from 'antd'
import { SelectProps } from 'antd/es/select'

import { EnumItem } from '@/types'

const { Option } = Select

interface Props extends SelectProps<number | string> {
  getOptions: (keyword: string) => Promise<EnumItem[]>
}

const AutoInput: SFC<Props> = props => {
  const [options, setOptions] = useState<EnumItem[]>([])
  const [allow, setAllow] = useState(false)
  const [keyword, setKeyword] = useState(undefined)

  const { getOptions, ...rest } = props

  const handleSearch = (keyword: string) => {
    setKeyword(keyword)
    setAllow(false)
    const timmer = setTimeout(() => {
      setAllow(true)
      clearTimeout(timmer)
    }, 500)
  }

  useEffect(() => {
    if (allow && keyword) {
      getOptions(keyword).then(setOptions)
    }
  }, [keyword, allow])

  return (
    <Select
      {...rest}
      showSearch
      allowClear
      filterOption={false}
      style={{ minWidth: 160 }}
      onSearch={handleSearch}
    >
      {options.map(({ label, value }) => (
        <Option key={value} value={value}>
          {label}
        </Option>
      ))}
    </Select>
  )
}

export default AutoInput
