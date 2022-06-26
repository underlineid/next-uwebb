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

import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import * as Fathom from 'fathom-client'
import {
  name,
  description,
  fathomId,
  fathomConfig,
  posthogId,
  posthogConfig
} from 'lib/config'
import { PageHead } from 'components/PageHead'
import reduxStore from '../redux/store'
import { useRouter } from 'next/router'
import { AppProps } from 'next/app'
import posthog from 'posthog-js'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    function onRouteChangeComplete() {
      if (fathomId) {
        Fathom.trackPageview()
      }

      if (posthogId) {
        posthog.capture('$pageview')
      }
    }

    if (fathomId) {
      Fathom.load(fathomId, fathomConfig)
    }

    if (posthogId) {
      posthog.init(posthogId, posthogConfig)
    }

    router.events.on('routeChangeComplete', onRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router.events])

  return (
    <Provider store={reduxStore}>
      <div className='app_root'>
        <PageHead title={name} description={description} />
        <Component {...pageProps} />
      </div>
    </Provider>
  )
}
