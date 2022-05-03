import React from 'react'
import { ExportOutlined } from '@ant-design/icons'
import TabSiteSettings from './TabSiteSettings'
import PageHeader from '../../components/pageHeader/PageHeader'
import ButtonSave from '../../components/button/ButtonSave'

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
          <ButtonSave
            disabled={typeof onSave !== 'function' || holdEdit}
            text='Save Changes'
          />
        </div>
      </div>
    </PageHeader>
  )
}
