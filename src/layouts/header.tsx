import React from 'react'
import { Layout, Dropdown, Menu } from 'antd'
import { LoginOutlined } from '@ant-design/icons'

const { Item } = Menu
const { Header } = Layout

export default () => {
  const menu = (
    <Menu style={{ width: 200 }}>
      <Item>
        <LoginOutlined style={{ fontSize: 16 }} />
        <span>退出登录</span>
      </Item>
    </Menu>
  )

  return (
    <Header
      className="flex justify-between px-3 text-white"
      style={{ height: 56, lineHeight: '56px' }}
    >
      <div className="flex items-center">
        <img className="mr-1" src="https://via.placeholder.com/32x32" />
        <h1 className="text-lg text-white font-bold text-blue-300">网站标题</h1>
      </div>

      <Dropdown overlay={menu} trigger={['click']}>
        <span className="cursor-pointer">王小一</span>
      </Dropdown>
    </Header>
  )
}
