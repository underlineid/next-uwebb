import React from 'react'
import PageHeader from '../../components/pageHeader/PageHeader'
import WithNavigation from '../../components/WithNavigation/WithNavigation'

export default function Dashboard() {
  return (
    <WithNavigation>
      <PageHeader
        title='Dashboard Overview'
        subtitle='Publish notion anda menjadi website dengan super cepat!'
      />
    </WithNavigation>
  )
}
