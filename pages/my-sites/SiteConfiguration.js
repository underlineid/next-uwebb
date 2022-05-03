import React from 'react'
import ContentBox from '../../components/contentBox/ContentBox'
import SiteDetailHeader from './SiteDetailHeader'

export default function SiteConfiguration({ site, holdEdit }) {
  return (
    <>
      <SiteDetailHeader site={site} holdEdit={holdEdit} />
      <ContentBox>
        <div>heheh</div>
      </ContentBox>
    </>
  )
}
