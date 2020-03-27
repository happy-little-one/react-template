import React, { SFC, useState } from 'react'
import { Modal } from 'antd'
import { render, unmountComponentAtNode } from 'react-dom'
import {
  SchemaForm,
  createFormActions,
  ISchema,
  IAntdSchemaFormProps,
} from '@formily/antd'

import { clearObj } from '@/common/utils'

const actions = createFormActions()

interface Config extends IAntdSchemaFormProps {
  /**
   * @param title modal标题
   * @param width modal宽度
   * @param schema 表单schema
   * @param onSubmit 提交回调，需返回一个Promise供loading和关闭处理
   *
   * 其他继承自formily IAntdSchemaFormProps
   */
  title: string
  width?: number
  schema: {
    [key: string]: ISchema
  }
  onSubmit: (values: object) => Promise<any>
}

export default (config: Config) => {
  const root = document.createElement('div')
  document.body.appendChild(root)

  const closeModal = () => {
    unmountComponentAtNode(root)
    document.body.removeChild(root)
  }

  const Content: SFC<Config> = props => {
    const { schema, onSubmit, title, width = 600, ...rest } = props
    const [loading, setLoading] = useState(false)

    const handleOk = () => {
      setLoading(true)
      actions
        .submit()
        .then(({ values }) => onSubmit(clearObj(values)))
        .then(() => {
          setLoading(false)
          closeModal()
        })
        .catch(err => {
          setLoading(false)
          throw err
        })
    }

    return (
      <Modal
        visible
        title={title}
        width={width}
        confirmLoading={loading}
        onCancel={closeModal}
        onOk={handleOk}
      >
        <SchemaForm
          {...rest}
          actions={actions}
          labelCol={24}
          schema={{
            type: 'object',
            properties: schema,
          }}
        />
      </Modal>
    )
  }

  render(<Content {...config} />, root)
}
