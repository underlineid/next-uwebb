import React, { useEffect } from 'react'
import { Page404 } from 'components'
import { useRouter } from 'next/router'
import { getCookie } from 'helper/util'

export default function NotFound() {
  const { pathname: path, replace } = useRouter()
  useEffect(() => {
    const isLogin = getCookie('is-login')
    const unauthPage = ['/login', '/register']
    const inUnauth = unauthPage.indexOf(path) < 0
    if (!isLogin && inUnauth) replace('/')
  }, [path, replace])
  return <Page404 />
}
