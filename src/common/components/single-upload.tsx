import React, { SFC, useState } from 'react'
import { Upload, message } from 'antd'
import { UploadProps } from 'antd/es/upload'

interface Props extends UploadProps {
  /**
   * @param onLoaded 上传回调 注入后端完整的response
   * @param chilren renderProps,注入loading
   *
   * 其他继承自antd UploadProps
   */
  onLoaded: (res: any) => void
  children: SFC<boolean>
}

import { BASE_URL } from '@/common/contants'

const SingleUpload: SFC<Props> = props => {
  const [loading, setLoading] = useState(false)
  const { children, onLoaded, action, ...rest } = props

  return (
    <Upload
      {...rest}
      action={BASE_URL + action}
      showUploadList={false}
      onChange={({ file }) => {
        const { status, response } = file

        switch (status) {
          case 'uploading':
            setLoading(true)
            break
          case 'done':
            setLoading(false)
            props.onLoaded(response)
            break
          default:
            setLoading(false)
            message.error('上传出错，请刷新重试')
        }
      }}
    >
      {children(loading)}
    </Upload>
  )
}

export default SingleUpload
