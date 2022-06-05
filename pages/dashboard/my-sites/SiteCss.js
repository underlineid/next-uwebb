import { Result } from 'antd'
import React from 'react'
import ContentBox from '../../../components/contentBox/ContentBox'

export default function SiteCss() {
  return (
    <ContentBox>
      <Result
        status='error'
        title="Section isn't ready yet"
        subTitle='Please kindly patient for this future feature'
      />
    </ContentBox>
  )
}
