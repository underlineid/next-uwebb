import React from 'react'
import { ExportOutlined, SaveOutlined } from '@ant-design/icons'
import TabSiteSettings from './TabSiteSettings'
import PageHeader from '../../components/pageHeader/PageHeader'
import { Button } from 'antd'

export default function SiteDetailHeader({ site, holdEdit, onSave }) {
  const {
    site_name: siteName,
    is_active,
    site_url: domain,
    custom_domain: customDomain
  } = site
  const isActive = is_active === 1

  const webDomain = customDomain || `${domain}.uwebb.id`
  let fullUrl = `https://${domain}.uwebb.id`
  if (site && customDomain) fullUrl = customDomain

  return (
    <PageHeader
      title={siteName}
      useBack
      tag={{
        color: isActive ? 'blue' : 'red',
        text: isActive ? 'active' : 'inactive'
      }}
    >
      <div className='flex align-top content-between'>
        <div>
          <div className='flex link no-line align-center'>
            <a href={fullUrl}>{webDomain}</a>&nbsp;&nbsp;
            <ExportOutlined />
          </div>
          <TabSiteSettings />
        </div>
        <div>
          <Button
            icon={<SaveOutlined />}
            type='primary'
            onClick={onSave}
            disabled={typeof onSave !== 'function' || holdEdit}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </PageHeader>
  )
}
