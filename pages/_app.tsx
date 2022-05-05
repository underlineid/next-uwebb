import 'antd/dist/antd.css'
import '../styles/global.scss'

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'

// used for rendering equations (optional)
import 'katex/dist/katex.min.css'

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-coy.css'

// this might be better for dark mode
// import 'prismjs/themes/prism-okaidia.css'

// global style overrides for notion
// import '../styles/notion.css'
import '../styles/notion.css'

// global style overrides for prism theme (optional)
import '../styles/prism-theme.css'

import '../styles/antd-custom.scss'

import React from 'react'
import { Provider } from 'react-redux'
import * as config from 'lib/config-uwebb'
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
