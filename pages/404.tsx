import React from 'react'
import { Page404 } from 'components'

export default function NotFound() {
  // const { pathname: path } = useRouter()
  // const isLogin = getCookie('is-login')
  // const unauthPage = ['/login', '/register']
  // const inUnauth = unauthPage.indexOf(path) < 0
  // if (!isLogin && inUnauth) return ''
  return <Page404 />
}
