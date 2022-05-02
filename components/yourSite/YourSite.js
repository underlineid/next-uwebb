import React from 'react'
import SiteThumbnail from './SiteThumbnail'
// import { getLinkPreview } from 'link-preview-js'
import style from './YourSite.module.scss'

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
