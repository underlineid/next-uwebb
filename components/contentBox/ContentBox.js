import React from 'react'
import style from './ContentBox.module.scss'

export default function ContentBox({ title = '', rightTitle = '', children }) {
  return (
    <div className={style.contentBox}>
      {title && (
        <div className={style.title}>
          <div className={style.text}>{title}</div>
          {rightTitle && <div>{rightTitle}</div>}
        </div>
      )}
      {children && <div className={style.content}>{children}</div>}
    </div>
  )
}
