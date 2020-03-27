import React, { SFC } from 'react'
import { registerFormFields, connect } from '@formily/antd'
import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { setup } from '@formily/antd-components'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import 'antd/dist/antd.css'

import { NumberRange, VerifyCode } from '@/common/components/fields'

import './index.css'
import App from './app'

setup()

registerFormFields({
  'number-range': connect()(NumberRange),
  'verify-code': connect()(VerifyCode),
})

const run = (App: SFC) => {
  render(
    <ConfigProvider locale={zhCN}>
      <HashRouter>
        <App />
      </HashRouter>
    </ConfigProvider>,
    document.querySelector('#root'),
  )
}

run(App)

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default
    run(NextApp)
  })
}
