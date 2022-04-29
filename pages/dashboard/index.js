import { PlusCircleFilled } from '@ant-design/icons'
import { Button } from 'antd'
import React, { useState } from 'react'
import ContentBox from '../../components/contentBox/ContentBox'
import PageHeader from '../../components/pageHeader/PageHeader'
import WithNavigation from '../../components/WithNavigation/WithNavigation'

export default function Dashboard() {
  const [openModal, setOpenModal] = useState(false)

  const doOpenModal = () => setOpenModal(true)

  return (
    <WithNavigation>
      <PageHeader
        title='Dashboard Overview'
        subtitle='Publish notion anda menjadi website dengan super cepat!'
      />
      <ContentBox
        title='Your Sites'
        rightTitle={
          <Button
            type='primary'
            icon={<PlusCircleFilled />}
            onClick={doOpenModal}
          >
            Add New Site
          </Button>
        }
      />
      <ContentBox title='This may can help you' />
    </WithNavigation>
  )
}
