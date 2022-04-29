import React from 'react'
import style from './YourSite.module.scss'

const SiteThumbnail = ({
  site_name: name,
  status = 'active',
  site_url: url
}) => {
  return (
    <div className={style.siteThumbnail}>
      <div className={style.siteImage} />
      <div className={style.siteInfo}>
        <div className={style.siteName}>{name}</div>
        <div className={style.siteStatus}>
          <div className={style.siteStatusUrl}>{url}</div>
          <div className={style.siteStatusBadge}>{status}</div>
        </div>
      </div>
    </div>
  )
}

export default function YourSite({ siteList }) {
  if (!siteList || siteList.length < 1) return ''

  return (
    <div className={style.SiteList}>
      {siteList.map((item, index) => (
        <SiteThumbnail key={item.id_site} {...item} />
      ))}
    </div>
  )
}
