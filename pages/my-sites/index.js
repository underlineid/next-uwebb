import React from 'react'
import ContentMySite from '../../components/contentMySite/ContentMySite'
import PageHeader from '../../components/pageHeader/PageHeader'
import WithAuthentication from '../../components/withAuthentication/WithAuthentication'

export default function MySites() {
  return (
    <WithAuthentication>
      <PageHeader
        title='My Sites'
        subtitle='Daftar seluruh website yang sudah Anda publish'
      />
      <ContentMySite />
    </WithAuthentication>
  )
}
