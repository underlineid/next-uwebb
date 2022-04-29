import React from 'react'
import style from './PageHeader.module.scss'

export default function PageHeader({ title = 'Title', subtitle = 'Subtitle' }) {
  return (
    <div className={style.pageHeader}>
      <div className={style.pageHeader__title}>{title}</div>
      <div className={style.pageHeader__subtitle}>{subtitle}</div>
    </div>
  )
}
