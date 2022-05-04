import React, { Fragment, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getLoginStatus } from '../../helper/util'
import SpinCenter from '../loading/SpinCenter'

export default function WithUnAuthentication({ children }) {
  const { replace } = useRouter()

  const isLoggedIn = getLoginStatus()
  const isLogin = isLoggedIn && isLoggedIn.status

  useEffect(() => {
    if (isLogin) replace('/dashboard')
  }, [replace, isLogin])

  let view = <SpinCenter size='large' absoluteCenter />
  if (!isLogin) view = children

  return <Fragment>{view}</Fragment>
}
