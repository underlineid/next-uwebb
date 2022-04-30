import React, { useCallback, useState } from 'react'
import { Modal, Spin } from 'antd'
import debounce from 'lodash.debounce'
import Link from 'next/link'
import { withFormik } from 'formik'
import FieldInput from '../../fieldInput/FieldInput'
import { getUserId, supabaseClient } from '../../../helper/util'
import ButtonAdd from '../../button/ButtonAdd'

const supabase = supabaseClient()

function AddSitePopupView({
  isOpen,
  setOpen,
  isSubmitting,
  handleSubmit,
  setSubmitting,
  values,
  handleChange,
  errors
}) {
  const [checkingDomain, setCheckingDomain] = useState(false)

  const closeModal = () => setOpen(false)

  const doSubmit = () => {
    handleSubmit()
  }

  const btnSubmit = (
    <ButtonAdd
      onClick={doSubmit}
      loading={isSubmitting}
      disabled={checkingDomain === 'notAvailable'}
    >
      Add Site Now
    </ButtonAdd>
  )

  const callAPIDomain = async (value) => {
    const { data, error } = await supabase
      .from('site')
      .select('*')
      .eq('site_url', value)
    if (data && data.length < 1) setCheckingDomain('available')
    else if (data && data.length > 0) setCheckingDomain('notAvailable')
    console.log('res domain: ', data, error)
    setSubmitting(false)
  }

  const debounced = useCallback(debounce(callAPIDomain, 1000), [])

  const checkDomain = async (value) => {
    console.log('checking domain: ', value)
    setSubmitting(true)
    setCheckingDomain(true)

    debounced(value)
  }

  const onChangeDomain = (e) => {
    handleChange(e)
    if (e.target.value.length >= 3) checkDomain(e.target.value)
  }

  let domainStatus = ''
  if (checkingDomain === 'available')
    domainStatus = 'URL tersedia, buat sekarang.'
  else if (checkingDomain === 'notAvailable')
    domainStatus = 'URL tidak tersedia, silakan gunakan url lain.'
  else if (checkingDomain) domainStatus = <Spin size='small' />

  return (
    <Modal
      visible={isOpen}
      onCancel={closeModal}
      title='Add New Notion Site'
      footer={[btnSubmit]}
    >
      <div>
        <FieldInput
          name='siteName'
          label='Site Name'
          description='Nama site yang ingin diberikan ada website uWebb Kamu'
          placeholder='My Awesome Site'
          value={values.siteName}
          onChange={handleChange}
          error={errors.siteName}
        />
        <FieldInput
          name='notionUrl'
          label='Root Notion URL'
          description='Link notion Anda yang ingin dijadikan sebuah website'
          placeholder='https://youname.notion.site/inser-root-link-notion-here'
          value={values.notionUrl}
          onChange={handleChange}
          error={errors.notionUrl}
        />
        <FieldInput
          name='domainUrl'
          label='Site Domain Url'
          description='Alamat domain yang ingin digunakan untuk akses ke website uWebb kamu'
          placeholder='yoursite'
          value={values.domainUrl}
          onChange={onChangeDomain}
          error={errors.domainUrl}
          inLeft={<div>https://</div>}
          inRight={<div>.uwebb.id</div>}
          note={
            <div>
              {domainStatus && (
                <>
                  <div className={`info-domain-${checkingDomain}`}>
                    {domainStatus}
                  </div>
                  <br />
                </>
              )}
              Url kamu akan menggunakan subdomain uwebb.id, jika ingin
              menggunakan custom domain silakan{' '}
              <Link href='/subscription' className='link'>
                upgrade plan
              </Link>{' '}
              kamu.
            </div>
          }
        />
      </div>
    </Modal>
  )
}

const PopupAddSite = withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({
    siteName: '',
    notionUrl: '',
    domainUrl: ''
  }),
  validate: ({ siteName, notionUrl, domainUrl }) => {
    const errors = {}
    if (!siteName) errors.siteName = 'Nama site tidak boleh kosong'
    if (!notionUrl) errors.notionUrl = 'URL Notion tidak boleh kosong'
    if (domainUrl && domainUrl.length < 3)
      errors.domainUrl = 'Domain URL minimal 3 karakter'
    return errors
  },
  handleSubmit: (values, { setSubmitting, setValues, props }) => {
    const { onSuccess, setOpen } = props

    setSubmitting(true)

    const supa = supabaseClient()

    // DB field: user, site_name, site_url, site_notion

    const dataMap = {
      user: getUserId(),
      site_name: values.siteName,
      site_url: values.domainUrl,
      site_notion: values.notionUrl
    }

    const resetting = () => {
      setValues('siteName', '')
      setValues('notionUrl', '')
      setValues('domainUrl', '')
    }

    const inserting = async () => {
      console.log('Inserting... ', dataMap)
      const { data, error } = await supa.from('site').insert([dataMap])
      if (data) {
        console.log('Success add site')
        resetting()
        if (typeof onSuccess === 'function') onSuccess()
        else setOpen(false)
        setSubmitting(false)
      } else if (error) {
        console.error(error)
        alert(error)
      }
    }

    inserting()
    console.log('Submit New Site: ', values)
  }
})(AddSitePopupView)

export default PopupAddSite
