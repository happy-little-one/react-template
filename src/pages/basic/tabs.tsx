import React from 'react'
import { Tabs, Button } from 'antd'

const { TabPane } = Tabs

export default () => {
  return (
    <>
      <div className="px-3 bg-white">
        <h2 className="page-title">标签页</h2>
      </div>

      <Tabs
        className="page-tabs"
        tabBarStyle={{ background: '#fff', padding: '0 24px' }}
      >
        <TabPane key="1" tab="标签页1" className="page-tabpane">
          <img
            src="https://s1.ax1x.com/2020/03/25/8jFu26.png"
            className="w-full mb-3"
          />
        </TabPane>
        <TabPane key="2" tab="标签页2" className="page-tabpane">
          <div className="page-card">
            <img
              src="https://s1.ax1x.com/2020/03/25/8jZhVS.png"
              className="w-full"
            />
          </div>
        </TabPane>
      </Tabs>
    </>
  )
}
