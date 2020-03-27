import React, { SFC } from 'react'
import { Breadcrumb } from 'antd'
import { AntdIconProps } from '@ant-design/icons/es/components/AntdIcon'
import { useLocation } from 'react-router-dom'

import { RouteItem } from '@/routes'

interface Item {
  name: string
  icon?: SFC<AntdIconProps>
}

const { Item } = Breadcrumb

const AppBreadcrumb: SFC<{ routes: RouteItem[] }> = ({ routes }) => {
  const { pathname } = useLocation()

  // [{ name, path: '/a', icon }] => {'/a': { name, path }}
  const getCrumbMaps = (routes: RouteItem[]): { [key: string]: Item } => {
    return routes.reduce((acc, { name, icon, path, routes }) => {
      return {
        ...acc,
        [path]: { name, icon },
        ...(routes && getCrumbMaps(routes)),
      }
    }, {})
  }

  const crumbMaps = getCrumbMaps(routes)

  // '/a/b/c' => ['/a', '/a/b', '/a/b/c']
  const paths = pathname
    .split('/')
    .filter(Boolean)
    .map((_, index, arr) => `/${arr.slice(0, index + 1).join('/')}`)

  // {'/a': { name, path }} => [{ name, icon }]
  const crumbs = paths.map(path => crumbMaps[path]).filter(Boolean)

  return (
    <Breadcrumb className="px-3 pt-2 bg-white">
      {crumbs.map(({ name, icon: Icon }) => (
        <Item key={name}>
          {Icon && <Icon />}
          <span>{name}</span>
        </Item>
      ))}
    </Breadcrumb>
  )
}

export default AppBreadcrumb
