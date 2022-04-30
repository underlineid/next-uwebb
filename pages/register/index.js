import { Spin } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function Login() {
  const { replace } = useRouter()

  useEffect(() => {
    replace('/auth/register')
  }, [replace])

  return <Spin size='large' />
}
