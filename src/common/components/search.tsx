import React, { SFC } from 'react'
import { SearchOutlined, UndoOutlined } from '@ant-design/icons'
import {
  SchemaForm,
  Submit,
  Reset,
  FormButtonGroup,
  IAntdSchemaFormProps,
  ISchema,
} from '@formily/antd'

import { clearObj } from '@/common/utils'

export interface SearchProps extends IAntdSchemaFormProps {
  /**
   * @param 表单schema
   * @param onSearch 提交回调
   *
   * 其他继承自formily IAntdSchemaFormProps
   */
  schema: {
    [key: string]: ISchema
  }
  onSearch: (values: object) => void
}

const Search: SFC<SearchProps> = ({ schema, onSearch, ...rest }) => {
  return (
    <SchemaForm
      {...rest}
      inline
      schema={{
        type: 'object',
        properties: schema,
      }}
      onSubmit={(values: object) => onSearch(clearObj(values))}
      onReset={() => onSearch({})}
    >
      <FormButtonGroup>
        <Submit icon={<SearchOutlined />}>搜索</Submit>
        <Reset icon={<UndoOutlined />}>重置</Reset>
      </FormButtonGroup>
    </SchemaForm>
  )
}

export default Search
