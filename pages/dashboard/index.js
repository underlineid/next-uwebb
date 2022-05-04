import React from 'react'
import ContentBox from '../../components/contentBox/ContentBox'
import ContentMySite from '../../components/contentMySite/ContentMySite'
import PageHeader from '../../components/pageHeader/PageHeader'
import WithAuthentication from '../../components/withAuthentication/WithAuthentication'

export default function Dashboard() {
  return (
    <WithAuthentication>
      <PageHeader
        title='Dashboard Overview'
        subtitle='Publish notion anda menjadi website dengan super cepat!'
      />
      <ContentMySite />
      <ContentBox title='This may can help you' />
    </WithAuthentication>
  )
}
