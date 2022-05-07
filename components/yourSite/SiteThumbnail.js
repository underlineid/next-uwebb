import React from 'react'
import { EditOutlined, LinkOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import { useRouter } from 'next/router'
import style from './SiteThumbnail.module.scss'

export default function SiteThumbnail({
  name: name,
  url,
  is_active: isActive,
  custom_url: customDomain = ''
}) {
  const { push } = useRouter()

  let webUrl = url
  let linkUrl = `https://${url}`
  if (customDomain) {
    webUrl = customDomain
    linkUrl = customDomain
  }

  const status = isActive === 1 ? 'active' : 'inactive'

  const atarget = (linkText = linkUrl) => (
    <a href={linkUrl} target='_blank' rel='noopener noreferrer' title={linkUrl}>
      {linkText}
    </a>
  )

  const openNotion = () =>
    Modal.info({
      title: `Notion Link: ${name}`,
      content: <div>{atarget()}</div>
    })

  const toEdit = () => push(`/my-sites/${url}`)

  return (
    <>
      <div className={style.siteThumbnail}>
        <div className={style.siteImage} />
        <div className={style.siteInfo}>
          <div className={style.siteName}>{name}</div>
          <div className={style.siteStatus}>
            <div className={style.siteStatusUrl}>{atarget(webUrl)}</div>
            <div className={`${style.siteStatusBadge} ${style[status]}`}>
              {status}
            </div>
          </div>
        </div>
        <div className={style.actionGroup}>
          <Button type='text' icon={<LinkOutlined />} onClick={openNotion}>
            Notion Link
          </Button>
          <Button type='text' icon={<EditOutlined />} onClick={toEdit}>
            Edit Site
          </Button>
        </div>
      </div>
    </>
  )
}
