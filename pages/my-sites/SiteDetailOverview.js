import { Input, Switch, notification } from 'antd'
import React, { useState } from 'react'
import ContentBox from '../../components/contentBox/ContentBox'
import { getUserId, supabaseClient } from '../../helper/util'
import style from './SiteDetailOverview.module.scss'

const supa = supabaseClient()

const TextHead = ({ head }) => <div className={style.settingHead}>{head}</div>

const SettingRow = ({ head, subHead, children }) => (
  <div className={style.settingRow}>
    <TextHead head={head} />
    {subHead && <div className={style.settingSubhead}>{subHead}</div>}
    {children}
  </div>
)

export default function SiteDetailOverview({ site, holdEdit, setHold }) {
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

  const changeStatus = async () => {
    setHold(true)
    notification.destroy()

    const isActive = status === 1
    const nextValue = isActive ? 0 : 1

    const { data, error } = await supa
      .from('site')
      .update({ is_active: nextValue })
      .eq('id_site', site.id_site)

    let successMessage = 'Site has been activated'
    if (nextValue === 0) successMessage = 'Site has been deactivated'

    const type = data ? 'success' : 'error'
    const message = data ? successMessage : error.message || 'Failed'
    const title = `${data ? 'Success' : 'Failed'} update status`

    setTimeout(() => {
      notification[type]({ message, title })
      if (data) setStatus(nextValue)
      setHold(false)
    }, 1000)
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
                    onChange={changeStatus}
                    checkedChildren='ON'
                    unCheckedChildren='OFF'
                    loading={holdEdit}
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
