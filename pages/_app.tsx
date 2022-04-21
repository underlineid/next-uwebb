import React, { useEffect } from 'react'
import * as config from 'lib/config-uwebb'
import { useRouter } from 'next/router'
import { getCookie } from '../helper/util'
import { PageHead } from 'components/PageHead'

export default function App({ Component, pageProps }) {
  console.log('_app')
  console.log({ Component })
  console.log({ pageProps })

  const isLogin = getCookie('is-login')
  console.log({ isLogin })

  const { pathname: path, replace } = useRouter()

  useEffect(() => {
    const isLogin = getCookie('is-login')
    const unauthPage = ['/login', '/register', '/']
    const inUnauth = unauthPage.indexOf(path) < 0
    if (!isLogin && inUnauth) replace('/')
  }, [path, replace])

  console.log(config.description)

  return (
    <div className='app_root'>
      <PageHead title={config.name} description={config.description} />
      <Component {...pageProps} />
    </div>
  )
}
