import React from 'react'
import { useSelector } from 'react-redux'
import UnPuzzled from '../../public/legal/unpuzzled'
import SpinCenter from '../loading/SpinCenter'
import SiteThumbnail from './SiteThumbnail'
import style from './YourSite.module.scss'

export default function YourSite({ siteList }) {
  const siteUser = useSelector((state) => state.siteUser.value)

  const list = siteList || siteUser

  let ret = <SpinCenter size='large' />

  if (list && list === 'empty')
    ret = (
      <div className='in-center'>
        <div>
          <UnPuzzled />
        </div>
        <div className='body-info-bold'>Kamu belum memiliki site</div>
        <div className='body-info-sub'>
          Buat site dengan menyalin link notion dan publish site kamu sekarang
        </div>
      </div>
    )
  else if (list && list !== 'empty' && typeof list === 'object')
    ret = (
      <div className={style.SiteList}>
        {list.map((item) => (
          <SiteThumbnail key={item.id_site} {...item} />
        ))}
      </div>
    )

  return ret
}
