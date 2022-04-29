import React, { useCallback, useEffect, useState } from 'react'
import { getLinkPreview } from 'link-preview-js'
import style from './YourSite.module.scss'

const SiteThumbnail = ({
  site_name: name,
  status = 'active',
  site_url: url,
  site_notion: notionUrl
}) => {
  const [img, setImg] = useState(false)

  console.log(name, notionUrl)

  const gets = useCallback(async () => {
    // await getLinkPreview('https://www.youtube.com/watch?v=MejbOFk7H6c', {
    //   imagesPropertyType: 'og', // fetches only open-graph images
    //   headers: {
    //     'user-agent': 'googlebot', // fetches with googlebot crawler user agent
    //     'Accept-Language': 'fr-CA' // fetches site for French language
    //     // ...other optional HTTP request headers
    //   },
    //   timeout: 1000
    // }).then((data) => console.debug('Link Preview: ', data))
  }, [notionUrl])

  useEffect(() => {
    if (notionUrl) gets()
  }, [notionUrl, gets])

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
