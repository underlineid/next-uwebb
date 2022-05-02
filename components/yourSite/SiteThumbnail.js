import { EditOutlined, LinkOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import React, { useState } from 'react'
import style from './SiteThumbnail.module.scss'

export default function SiteThumbnail({
  site_name: name,
  site_url: url,
  site_notion: notionUrl,
  is_active: isActive,
  custom_domain: customDomain = '',
  ...other
}) {
  const [showNotion, setShowNotion] = useState(false)

  let webUrl = `${url}.uwebb.id`
  if (customDomain) webUrl = customDomain

  const status = isActive === 1 ? 'active' : 'inactive'

  console.log({ name, url, notionUrl, ...other })

  const openNotion = () =>
    Modal.info({
      title: `Notion Link: ${name}`,
      content: `${webUrl}`
    })

  return (
    <>
      <div className={style.siteThumbnail}>
        <div className={style.siteImage} />
        <div className={style.siteInfo}>
          <div className={style.siteName}>{name}</div>
          <div className={style.siteStatus}>
            <div className={style.siteStatusUrl}>{webUrl}</div>
            <div className={`${style.siteStatusBadge} ${style[status]}`}>
              {status}
            </div>
          </div>
        </div>
        <div className={style.actionGroup}>
          <Button type='text' icon={<LinkOutlined />} onClick={openNotion}>
            Notion Link
          </Button>
          <Button type='text' icon={<EditOutlined />}>
            Edit Site
          </Button>
        </div>
      </div>
    </>
  )
}
