import {
  CheckCircleFilled,
  CloseCircleFilled,
  DeleteOutlined,
  LoadingOutlined
} from '@ant-design/icons'
import debounce from 'lodash.debounce'
import { Input, Switch, notification, Button } from 'antd'
import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import ContentBox from '../../components/contentBox/ContentBox'
import { getUserId, supabaseClient } from '../../helper/util'
import { setSiteUser } from '../../redux/siteUser'
import style from './SiteDetailOverview.module.scss'
import FieldInput from '../../components/fieldInput/FieldInput'
import SiteDetailHeader from './SiteDetailHeader'

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
  const [domainStatus, setDomainStatus] = useState(false)

  const customDomain = site.custom_domain

  const dispatch = useDispatch()

  const onChangeSiteName = (e) => {
    setSiteName(e.target.value || '')
  }

  const callAPIDomain = async (value) => {
    if (value === siteDomain) setDomainStatus('available')
    if (!value || value === siteDomain) return setHold(false)
    setDomainStatus('loading')
    setHold(true)
    const { data, error } = await supa
      .from('site')
      .select('*')
      .eq('site_url', value)
    if (data && data.length < 1) setDomainStatus('available')
    else if (data && data.length > 0) setDomainStatus('notAvailable')
    else if (error)
      notification.error({
        message: 'API Error',
        description: "uWebb domain isn't available"
      })
    setHold(false)
  }

  const debounceDomain = useCallback(debounce(callAPIDomain, 500), [])

  const onChangeDomain = (e) => {
    setHold(true)
    setDomainStatus('loading')
    setDomain(e.target.value || '')
    debounceDomain(e.target.value || '')
  }

  const onChangeNotion = (e) => {
    setUrlNotion(e.target.value || '')
  }

  const getSiteList = async (callback) => {
    const userId = getUserId()

    const { data: site, error } = await supa
      .from('site')
      .select('*')
      .eq('user', userId)

    setTimeout(() => {
      if (site) {
        if (site.length < 1) dispatch(setSiteUser('empty'))
        else if (site.length > 0) dispatch(setSiteUser(site))
      } else console.error('get site error: ', error)

      if (typeof callback === 'function') callback()
    }, 3000)
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
    const title = data ? 'Success' : 'Failed'

    const callback = () => {
      notification[type]({ message: title, description: message })
      if (data) setStatus(nextValue)
      setHold(false)
    }

    getSiteList(callback)
  }

  let domainIcon = false
  let domainError = false

  if (domainStatus === 'loading') domainIcon = <LoadingOutlined />
  else if (domainStatus === 'available')
    domainIcon = <CheckCircleFilled style={{ color: '#52c41a' }} />
  else if (domainStatus === 'notAvailable') {
    domainIcon = <CloseCircleFilled style={{ color: '#ff4d4f' }} />
    domainError = 'Domain ini tidak tersedia'
  }

  return (
    <>
      <SiteDetailHeader site={site} holdEdit={holdEdit} />
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
              <FieldInput
                value={siteDomain}
                onChange={onChangeDomain}
                inLeft={domainIcon}
                inRight='.uwebb.id'
                error={domainError}
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

      <ContentBox
        title='Delete Site'
        rightTitle={
          <Button type='danger' icon={<DeleteOutlined />} disabled={holdEdit}>
            Delete Site
          </Button>
        }
      >
        <div>
          Delete site kamu secara permanen dari uWebb.
          <br />
          Setelah menghapus site, kamu tidak dapat mengembalikan site tersebut.
        </div>
      </ContentBox>
    </>
  )
}
