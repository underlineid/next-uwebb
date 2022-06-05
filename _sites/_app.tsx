// // global styles shared across the entire site
// // import '../styles/global.css'
// import '../../styles/global.scss'

// // core styles shared by all of react-notion-x (required)
// import '../react-notion-x/src/styles.css'

// // used for rendering equations (optional)
// import '../katex/dist/katex.min.css'

// // used for code syntax highlighting (optional)
// import '../prismjs/themes/prism-coy.css'

// this might be better for dark mode
// import 'prismjs/themes/prism-okaidia.css'

// // global style overrides for notion
// // import '../styles/notion.css'
// import '../../styles/notion.css'

// // global style overrides for prism theme (optional)
// import '../../styles/prism-theme.css'

import * as React from 'react'
import * as Fathom from 'fathom-client'
import { useRouter } from 'next/router'
import { ThemeProvider } from 'next-themes'
import posthog from 'posthog-js'

import { bootstrap } from 'lib/bootstrap-client'
import { fathomId, fathomConfig, posthogId, posthogConfig } from 'lib/config'

if (typeof window !== 'undefined') {
  bootstrap()
}

export default function App({ Component, pageProps }) {
  const router = useRouter()

  React.useEffect(() => {
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
    <ThemeProvider disableTransitionOnChange>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}