import { withFormik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import ContentBox from '../../components/contentBox/ContentBox'
import SpinCenter from '../../components/loading/SpinCenter'
import SiteConfiguration from './SiteConfiguration'
import SiteCss from './SiteCss'
import SiteDetailHeader from './SiteDetailHeader'
import SiteOverview from './SiteOverview'

function SiteDetailView({
  values,
  isSubmitting,
  setSubmitting,
  ...otherProps
}) {
  const { query } = useRouter()
  const { tab } = query

  if (!values.siteName)
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
    siteCostumDomain: site.costum_domain,
    currentValue: site
  })
})(SiteDetailView)
