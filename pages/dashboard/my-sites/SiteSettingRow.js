import React from 'react'
import style from './SiteDetailOverview.module.scss'

export const SiteTextHead = ({ head }) => (
  <div className={style.settingHead}>{head}</div>
)

export default function SiteSettingRow({ head, subHead, children }) {
  return (
    <div className={style.settingRow}>
      <SiteTextHead head={head} />
      {subHead && <div className={style.settingSubhead}>{subHead}</div>}
      {children}
    </div>
  )
}
