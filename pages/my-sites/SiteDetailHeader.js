import React from 'react'
import { ExportOutlined } from '@ant-design/icons'
import TabSiteSettings from './TabSiteSettings'
import PageHeader from '../../components/pageHeader/PageHeader'
import ButtonSave from '../../components/button/ButtonSave'

export default function SiteDetailHeader({ values, holdEdit, handleSubmit }) {
  const {
    siteActive,
    currentValue: { site_name: siteName },
    sitecustomDomain: customDomain,
    siteUrl: domain
  } = values

  const isActive = siteActive === 1

  const webDomain = customDomain || `${domain}.uwebb.id`
  let fullUrl = `https://${domain}.uwebb.id`
  if (customDomain) fullUrl = customDomain

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
            onClick={handleSubmit}
            disabled={Object.keys(values).length < 1 || holdEdit}
            loading={holdEdit}
            text='Save Changes'
          />
        </div>
      </div>
    </PageHeader>
  )
}
