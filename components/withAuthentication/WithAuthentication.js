import React, { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getLoginStatus } from '../../helper/util'
import SpinCenter from '../loading/SpinCenter'
import WithNavigation from '../WithNavigation/WithNavigation'

export default function WithAuthentication({ children }) {
  const { replace } = useRouter()
  const [view, setView] = useState(<SpinCenter size='large' absoluteCenter />)

  const isLoggedIn = getLoginStatus()
  const isLogin = isLoggedIn && isLoggedIn.status

  useEffect(() => {
    if (!isLogin) replace('/auth/login')
  }, [replace, isLogin])

  useEffect(() => {
    if (isLogin) setView(<WithNavigation>{children}</WithNavigation>)
  }, [isLogin, children])

  return <Fragment>{view}</Fragment>
}
