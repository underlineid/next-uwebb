import 'antd/dist/antd.css'
import '../styles/global.scss'
import '../styles/antd-custom.scss'

import React from 'react'
import { Provider } from 'react-redux'
import * as config from 'lib/config-uwebb'
// import { getLoginStatus } from '../helper/util'
import { PageHead } from 'components/PageHead'
import reduxStore from '../redux/store'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={reduxStore}>
      <div className='app_root'>
        <PageHead title={config.name} description={config.description} />
        <Component {...pageProps} />
      </div>
    </Provider>
  )
}
