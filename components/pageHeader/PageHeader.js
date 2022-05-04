import { PageHeader as PageHeaderAntd, Tag } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'

export default function PageHeader({
  title = 'Title',
  subtitle,
  useBack = false,
  children,
  tag = { color: '', text: '' }
}) {
  const { back } = useRouter()

  let tags = false
  if (tag && tag.color && tag.text)
    tags = <Tag color={tag.color}>{tag.text}</Tag>

  let backFn = false
  if (useBack) backFn = typeof useBack === 'function' ? useBack : back

  return (
    <PageHeaderAntd
      title={title}
      subtitle={subtitle}
      tags={tags}
      onBack={backFn}
    >
      {children}
    </PageHeaderAntd>
  )
}
