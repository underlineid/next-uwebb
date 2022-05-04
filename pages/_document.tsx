import * as React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { IconContext } from '@react-icons/all-files'

export default class MyDocument extends Document {
  render() {
    return (
      <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
        <Html lang='en'>
          <Head>
            <link rel='shortcut icon' href='/uWebb-favicon.ico' />
            <link
              rel='icon'
              type='image/png'
              sizes='32x32'
              href='uWebb-favicon.png'
            />
            <link rel='preconnect' href='https://fonts.googleapis.com' />
            <link
              href='https://fonts.googleapis.com/css2?family=Fira+Code&family=Merienda&family=Open+Sans&family=Patrick+Hand&family=Roboto&family=Roboto+Mono&display=swap'
              rel='stylesheet'
            />
            <link rel='manifest' href='/manifest.json' />
          </Head>

          <body>
            <Main />

            <NextScript />
          </body>
        </Html>
      </IconContext.Provider>
    )
  }
}
