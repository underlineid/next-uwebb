import '../styles/global.css'
import 'antd/dist/antd.css'

import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import * as config from 'lib/config-uwebb'
import { useRouter } from 'next/router'
import { getLoginStatus } from '../helper/util'
import { PageHead } from 'components/PageHead'
import reduxStore from '../redux/store'

export default function App({ Component, pageProps }) {
  const { pathname: path, replace } = useRouter()

  useEffect(() => {
    const isLoggedIn = getLoginStatus()
    // const unauthPage = ['/login', '/register', '/']
    // const inUnauth = unauthPage.indexOf(path) < 0
    // if (!isLoggedIn && inUnauth) replace('/')

    if (path === '/login') {
      if (isLoggedIn) replace('/')
      else replace('/auth/login')
    } else if (path === '/register') {
      if (isLoggedIn) replace('/')
      else replace('/auth/register')
    }
  }, [path, replace])

  return (
    <Provider store={reduxStore}>
      <div className='app_root'>
        <PageHead title={config.name} description={config.description} />
        <Component {...pageProps} />
      </div>
    </Provider>
  )
}
