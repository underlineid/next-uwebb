import { useRouter } from 'next/router'
import React, { useState } from 'react'
import ContentBox from '../../components/contentBox/ContentBox'
import SpinCenter from '../../components/loading/SpinCenter'
import SiteConfiguration from './SiteConfiguration'
import SiteDetailHeader from './SiteDetailHeader'
import SiteOverview from './SiteOverview'

export default function SiteDetail({ site }) {
  const [holdEdit, setHold] = useState(false)

  const { query } = useRouter()
  const { tab } = query

  if (!site)
    return (
      <ContentBox>
        <SpinCenter size='large' />
      </ContentBox>
    )

  const props = { site, holdEdit, setHold }

  let view = <SiteOverview {...props} />
  if (tab === 'config') view = <SiteConfiguration {...props} />

  return (
    <>
      <SiteDetailHeader {...props} />
      {view}
    </>
  )
}
