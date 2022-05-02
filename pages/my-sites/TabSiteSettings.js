import React from 'react'
import { Tabs } from 'antd'
import { useRouter } from 'next/router'

const { TabPane } = Tabs

const tabList = [
  { text: 'Overview', key: 'overview' },
  { text: 'Site Configuration', key: 'config' },
  { text: 'CSS Injection', key: 'css' }
]

export default function TabSiteSettings() {
  const { query, replace, asPath } = useRouter()
  const { tab } = query

  const tabClick = (e) => {
    const newLink = `${`${asPath}`.split('?')[0]}?tab=${e}`
    replace(newLink, undefined, { shallow: true })
  }

  return (
    <div className='TabSiteSettings'>
      <Tabs defaultActiveKey={tab} onChange={tabClick}>
        {tabList.map((item) => (
          <TabPane key={item.key} tab={item.text} />
        ))}
      </Tabs>
    </div>
  )
}
