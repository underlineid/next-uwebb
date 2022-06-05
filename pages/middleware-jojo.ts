import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(req: NextRequest, res: NextResponse) {
  const { pathname } = req.nextUrl
  const url = req.nextUrl.clone()
  const hostname = req.headers.get('host')

  let consoleMarker = 0

  const currentHost =
    process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
      ? hostname
          .replace(`.vercel.pub`, '')
          .replace(`.platformize.vercel.app`, '')
      : hostname.replace('.localhost:3000', '')

  console.log('MIDDLEWARE WORKER STARTED')
  console.log('REQUEST: ', req)
  console.log('RESPONSE: ', res)
  console.log('HOSTNAME: ', hostname)
  console.log('PATHNAME: ', pathname)
  console.log('CURRENT HOST: ', currentHost)

  if (!hostname) {
    consoleMarker = 26
    return new Response(null, {
      status: 400,
      statusText: 'No hostname found in request headers'
    })
  }

  if (pathname.startsWith('/_sites')) {
    console.log('IN LINE 31')
    return new Response(null, { status: 404 })
  }

  if (!pathname.includes('.')) {
    consoleMarker = 39
    if (currentHost === 'dashboard') {
      url.pathname = `/dashboard${pathname}`
      return NextResponse.rewrite(url)
    }
  }

  if (hostname === 'localhost:9090' || hostname === 'uwebb.vercel.app') {
    url.pathname = `/home${pathname}`
    return NextResponse.rewrite(url)
  }

  url.pathname = `/_sites/${currentHost}${pathname}`
  consoleMarker = 47

  console.log('CONSOLE MARKER: ', consoleMarker)

  console.log('REWRITTEN URL :', url)
  console.log('MIDDLEWARE WORKER ENDED')
  console.log('-----------------------------------------')

  // return new Response(`This NextRouting BYPASSED by middleware. url: ${url}`)
  return NextResponse.rewrite(url)
}
