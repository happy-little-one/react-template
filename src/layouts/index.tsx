import React, { SFC, Suspense, lazy } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Layout, Skeleton } from 'antd'

import { RouteItem } from '@/routes'

import Header from './header'
import Sider from './sider'
import Breadcrumb from './breadcrumb'

const { Content } = Layout

const renderRoutes = (routes: RouteItem[]) =>
  routes.map(({ path, routes, component }) =>
    routes ? (
      renderRoutes(routes)
    ) : (
      <Route key={path} path={path} component={component} />
    ),
  )

const getFirstPath = (routes: RouteItem[]) => {
  const first = routes[0]
  return first.routes ? getFirstPath(first.routes) : first.path
}

const AppLayout: SFC<{ routes: RouteItem[] }> = ({ routes }) => {
  const firstPath = getFirstPath(routes)

  return (
    <Layout className="h-screen">
      <Header />
      <Layout>
        <Sider routes={routes} />
        <Content>
          <Breadcrumb routes={routes} />
          <Suspense fallback={<Skeleton />}>
            <Route path="/" exact render={() => <Redirect to={firstPath} />} />
            {renderRoutes(routes)}
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout
