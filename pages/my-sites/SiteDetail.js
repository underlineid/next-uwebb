import {
  DeleteOutlined,
  ExportOutlined,
  HolderOutlined,
  SaveOutlined
} from '@ant-design/icons'
import { Button } from 'antd'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import ContentBox from '../../components/contentBox/ContentBox'
import SpinCenter from '../../components/loading/SpinCenter'
import PageHeader from '../../components/pageHeader/PageHeader'
import SiteDetailOverview from './SiteDetailOverview'
import TabSiteSettings from './TabSiteSettings'

export default function SiteDetail({ site }) {
  const [holdEdit, setHold] = useState(false)

  const { query } = useRouter()
  const { tab } = query

  if (!site)
    return (
      <ContentBox>
        <SpinCenter size='large' />
      </ContentBox>
    )

  const {
    custom_domain: domain,
    site_url: url,
    site_name: name,
    is_active
  } = site

  const webDomain = domain || `${url}.uwebb.id`
  let fullUrl = `https://${url}.uwebb.id`
  if (site && domain) fullUrl = domain

  const isActive = is_active === 1

  let view = (
    <SiteDetailOverview site={site} holdEdit={holdEdit} setHold={setHold} />
  )

  return (
    <>
      <PageHeader
        title={name}
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
            <Button icon={<SaveOutlined />} type='primary' disabled={holdEdit}>
              Save Changes
            </Button>
          </div>
        </div>
      </PageHeader>
      {view}
      <ContentBox title='Delete Site'>
        <div className='flex align-top content-between'>
          <div>
            Delete site kamu secara permanen dari uWebb. Setelah menghapus site,
            kamu tidak dapat mengembalikan site tersebut.
          </div>
          <div>
            <Button type='danger' icon={<DeleteOutlined />} disabled={holdEdit}>
              Delete Site
            </Button>
          </div>
        </div>
      </ContentBox>
    </>
  )
}
