import { lazy, SFC, LazyExoticComponent } from 'react'
import { OrderedListOutlined, HomeOutlined } from '@ant-design/icons'
import { AntdIconProps } from '@ant-design/icons/es/components/AntdIcon'

export interface RouteItem {
  name: string
  path: string
  icon?: SFC<AntdIconProps>
  component?: LazyExoticComponent<SFC>
  routes?: Array<RouteItem>
}

const routes: Array<RouteItem> = [
  {
    name: '首页',
    path: '/home',
    icon: HomeOutlined,
    component: lazy(() =>
      import(/* webpackChunkName: 'home' */ '@/pages/home'),
    ),
  },
  {
    name: '基础页面',
    path: '/basic',
    icon: OrderedListOutlined,
    routes: [
      {
        name: '搜索列表',
        path: '/basic/list',
        component: lazy(() =>
          import(/* webpackChunkName: 'list' */ '@/pages/basic/list'),
        ),
      },
      {
        name: '标签页',
        path: '/basic/tabs',
        component: lazy(() =>
          import(/* webpackChunkName: 'tabs' */ '@/pages/basic/tabs'),
        ),
      },
    ],
  },
]

export default routes
