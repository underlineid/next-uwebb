import React, { Fragment, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getLoginStatus } from '../../helper/util'
import SpinCenter from '../loading/SpinCenter'

export default function WithAuthentication({ children }) {
  const { replace } = useRouter()

  const isLoggedIn = getLoginStatus()
  const isLogin = isLoggedIn && isLoggedIn.status

  console.log('auth: ', isLoggedIn)

  useEffect(() => {
    if (!isLogin) replace('/auth/login')
  }, [replace, isLogin])

  let view = <SpinCenter size='large' absoluteCenter />
  if (isLogin) view = children

  return <Fragment>{view}</Fragment>
}
