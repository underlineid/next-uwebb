import React from 'react'
import { Button, Modal } from 'antd'
import Link from 'next/link'
import { withFormik } from 'formik'
import { PlusCircleFilled as Plus } from '@ant-design/icons'
import FieldInput from '../../fieldInput/FieldInput'
import { getUserId, supabaseClient } from '../../../helper/util'

function AddSitePopupView({
  isOpen,
  setOpen,
  isSubmitting,
  handleSubmit,
  values,
  handleChange,
  errors
}) {
  const closeModal = () => setOpen(false)

  const doSubmit = () => {
    handleSubmit()
  }

  const btnSubmit = (
    <Button
      onClick={doSubmit}
      type='primary'
      icon={<Plus />}
      loading={isSubmitting}
      key='btnSubmitAddSite'
    >
      Add Site Now
    </Button>
  )

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
          onChange={handleChange}
          error={errors.domainUrl}
          inRight={<div>.uwebb.id</div>}
          note={
            <div>
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
      } else if (error) alert(error)
    }

    inserting()
    console.log('Submit New Site: ', values)
  }
})(AddSitePopupView)

export default PopupAddSite
