import React, { SFC } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'

import { RouteItem } from '@/routes'

const { Sider } = Layout
const { SubMenu, Item } = Menu

const AppSider: SFC<{ routes: RouteItem[] }> = ({ routes }) => {
  const history = useHistory()
  const { pathname } = useLocation()

  const renderRoutes = (routes: RouteItem[]) => {
    return routes.map(({ name, path, icon: Icon, routes }) =>
      routes ? (
        <SubMenu
          key={path}
          title={
            <>
              {Icon && <Icon style={{ fontSize: 18 }} />}
              <span>{name}</span>
            </>
          }
        >
          {renderRoutes(routes)}
        </SubMenu>
      ) : (
        <Item key={path}>
          {Icon && <Icon style={{ fontSize: 18 }} />}
          <span>{name}</span>
        </Item>
      ),
    )
  }

  // '/a/b/c' => ['/a', '/a/b', '/a/b/c']
  const paths = pathname
    .split('/')
    .filter(Boolean)
    .map((_, index, arr) => `/${arr.slice(0, index + 1).join('/')}`)

  return (
    <Sider
      breakpoint="xl"
      className="border-0 border-t border-gray-800 border-solid"
    >
      <Menu
        key={pathname}
        theme="dark"
        mode="inline"
        defaultOpenKeys={paths}
        selectedKeys={paths}
        onClick={({ key }) => key !== pathname && history.push(key)}
      >
        {renderRoutes(routes)}
      </Menu>
    </Sider>
  )
}

export default AppSider
