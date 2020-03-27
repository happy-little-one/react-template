import React, { SFC, useState, useEffect } from 'react'
import { Input, Button, message } from 'antd'

interface Props {
  onChange: (value: string) => void
  getCode: () => Promise<any>
}

const VerifyCode: SFC<Props> = ({ getCode, onChange }) => {
  const [delay, setDelay] = useState(0)

  useEffect(() => {
    const timmer = setTimeout(() => {
      if (delay === 0) {
        clearTimeout(timmer)
      } else {
        setDelay(delay - 1)
      }
    }, 1000)
  }, [delay])

  const handleClick = () => {
    getCode().then(() => {
      message.success('验证码发送成功，请查看手机')
      setDelay(60)
    })
  }

  return (
    <Input.Group compact>
      <Input
        style={{ width: 120 }}
        onChange={e => onChange(e.target.value.trim())}
      />

      <Button type="primary" disabled={delay > 0} onClick={handleClick}>
        {delay === 0 ? '获取验证码' : `${delay}秒后重新发送`}
      </Button>
    </Input.Group>
  )
}

export default VerifyCode
