import { Input, Switch } from 'antd'
import React, { useState } from 'react'
import ContentBox from '../../components/contentBox/ContentBox'
import style from './SiteDetailOverview.module.scss'

const TextHead = ({ head }) => <div className={style.settingHead}>{head}</div>

const SettingRow = ({ head, subHead, children }) => (
  <div className={style.settingRow}>
    <TextHead head={head} />
    {subHead && <div className={style.settingSubhead}>{subHead}</div>}
    {children}
  </div>
)

export default function SiteDetailOverview({ site }) {
  const [status, setStatus] = useState(site.is_active)
  const [siteName, setSiteName] = useState(site.site_name || '')
  const [siteDomain, setDomain] = useState(site.site_url || '')
  const [urlNotion, setUrlNotion] = useState(site.site_notion || '')

  const onChangeSiteName = (e) => {
    setSiteName(e.target.value || '')
  }

  const onChangeDomain = (e) => {
    setDomain(e.target.value || '')
  }

  const onChangeNotion = (e) => {
    setUrlNotion(e.target.value || '')
  }

  return (
    <ContentBox>
      <div className='flex align-top insideHalf'>
        <div>IMAGE</div>
        <div>
          <SettingRow
            head={
              <div className='flex align-center'>
                <TextHead head='Site Status' />
                <div className={style.switch}>
                  <Switch
                    checked={status === 1}
                    onChange={() => setStatus(status === 1 ? 0 : 1)}
                    checkedChildren='ON'
                    unCheckedChildren='OFF'
                  />
                </div>
              </div>
            }
            subHead={`Status website Anda saat ini
              ${status === 1 ? 'sudah aktif' : 'belum aktif'}.`}
          ></SettingRow>
          <SettingRow
            head='Site Name'
            subHead='Nama site milik Anda yang dipublish ke internet'
          >
            <Input value={siteName} onChange={onChangeSiteName} />
          </SettingRow>
          <SettingRow
            head='Site Domain URL'
            subHead='Input url domain dari site yang ingin kamu bangun.'
          >
            <Input
              value={siteDomain}
              onChange={onChangeDomain}
              addonAfter='.uwebb.id'
            />
          </SettingRow>
          <SettingRow
            head='Root Page URL'
            subHead='Paste link notion yang ingin kamu jadikan web.'
          >
            <Input value={urlNotion} onChange={onChangeNotion} />
          </SettingRow>
        </div>
      </div>
    </ContentBox>
  )
}
