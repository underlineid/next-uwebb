import React, { Fragment, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getLoginStatus } from '../../helper/util'
import { Spin } from 'antd'

export default function WithAuthentication({ children }) {
  const { pathname: path, replace } = useRouter()

  const isLoggedIn = getLoginStatus()
  const isLogin =
    isLoggedIn && isLoggedIn !== 'not-logged-in' && isLoggedIn.status

  useEffect(() => {
    const authRoute = [
      '/',
      '/login',
      '/register',
      '/auth/login',
      '/auth/register'
    ]

    console.log({ isLogin }, authRoute.indexOf(path))

    if (isLogin) {
      // if login & on there route, knock back to dashboard
      if (authRoute.indexOf(path) > -1) replace('/dashboard')
    } else {
      if (authRoute.indexOf(path) < 0) replace('/')
    }
  }, [path, replace, isLogin])

  let view = <Spin size='large' />
  if (isLogin) view = children

  return <Fragment>{view}</Fragment>
}
