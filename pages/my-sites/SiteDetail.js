import { message } from 'antd'
import { withFormik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import ContentBox from '../../components/contentBox/ContentBox'
import SpinCenter from '../../components/loading/SpinCenter'
import { supabaseClient } from '../../helper/util'
import SiteConfiguration from './SiteConfiguration'
import SiteCss from './SiteCss'
import SiteDetailHeader from './SiteDetailHeader'
import SiteOverview from './SiteOverview'

const supa = supabaseClient()

function SiteDetailView({
  values,
  isSubmitting,
  setSubmitting,
  ...otherProps
}) {
  const { query } = useRouter()
  const { tab } = query

  if (!values)
    return (
      <ContentBox>
        <SpinCenter size='large' />
      </ContentBox>
    )

  const props = {
    values,
    holdEdit: isSubmitting,
    setHold: setSubmitting,
    ...otherProps
  }

  let view = <SiteOverview {...props} />
  if (tab === 'config') view = <SiteConfiguration {...props} />
  else if (tab === 'css') view = <SiteCss {...props} />

  return (
    <>
      <SiteDetailHeader {...props} />
      {view}
    </>
  )
}

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ site }) => ({
    siteId: site.id,
    siteName: site.site_name,
    siteOwner: site.user,
    siteUrl: site.site_url,
    siteNotion: site.site_notion,
    siteActive: site.is_active,
    siteConfig: site.configuration,
    sitecustomDomain: site.custom_domain,
    currentValue: site
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    const { onUpdate } = props

    setSubmitting(true)
    const submitValues = { ...values }
    delete submitValues.currentValue
    console.log('Submitting values: ', submitValues)

    const hitSubmit = async () => {
      const { data, error } = await supa
        .from('site')
        .update({
          site_name: values.siteName,
          site_url: values.siteurl,
          site_notion: values.siteNotion,
          custom_domain: values.custom_domain,
          configuration: values.siteConfig
        })
        .eq('id', values.siteId)

      const onSuccess = () => message.success('Site kamu telah terupdate')
      if (typeof onUpdate === 'function') onUpdate(onSuccess)
      else if (data) onSuccess()
      else if (error) message.error(error.message)
      else message.error('Update site gagal!')
      setTimeout(setSubmitting, 500, false)
    }

    hitSubmit()
  }
})(SiteDetailView)
