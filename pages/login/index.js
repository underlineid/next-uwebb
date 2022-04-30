import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import SpinCenter from '../../components/loading/SpinCenter'

export default function Login() {
  const { replace } = useRouter()

  useEffect(() => {
    replace('/auth/login')
  }, [replace])

  return <SpinCenter size='large' />
}
