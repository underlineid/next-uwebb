import React, { Fragment, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getLoginStatus } from '../../helper/util'
import SpinCenter from '../loading/SpinCenter'

export default function WithAuthentication({ children }) {
  const { replace } = useRouter()

  const isLoggedIn = getLoginStatus()

  const isntLogin = !isLoggedIn || isLoggedIn === 'not-logged-in'

  useEffect(() => {
    if (isntLogin) replace('/auth/login')
  }, [replace, isntLogin])

  let view = <SpinCenter size='large' absoluteCenter />
  if (!isntLogin) view = children

  return <Fragment>{view}</Fragment>
}
