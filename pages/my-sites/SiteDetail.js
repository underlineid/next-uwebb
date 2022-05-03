import { useRouter } from 'next/router'
import React, { useState } from 'react'
import ContentBox from '../../components/contentBox/ContentBox'
import SpinCenter from '../../components/loading/SpinCenter'
import SiteConfiguration from './SiteConfiguration'
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

  let view = <SiteOverview site={site} holdEdit={holdEdit} setHold={setHold} />
  if (tab === 'config') view = <SiteConfiguration site={site} />

  return view
}
