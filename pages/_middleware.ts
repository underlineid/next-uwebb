import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(req: NextRequest, res = NextResponse) {
  const { pathname } = req.nextUrl
  const url = req.nextUrl.clone()
  const hostname = req.headers.get('host')

  const currentHost =
    process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
      ? hostname
          .replace(`.vercel.pub`, '')
          .replace(`.platformize.vercel.app`, '')
      : hostname.replace('.localhost:3000', '')

  console.log('--------------MIDDLEWARE WORKER STARTED NEW-------------------')
  console.log('REQUEST: ', req)
  console.log('RESPONSE: ', res)
  console.log('HOSTNAME: ', hostname)
  console.log('PATHNAME: ', pathname)
  console.log('CURRENT HOST: ', currentHost)

  const rewriteDashboard = () => {
    url.pathname = `/dashboard${pathname}`
    return NextResponse.rewrite(url)
  }

  if (!hostname)
    return new Response(null, {
      status: 400,
      statusText: 'No hostname found in request headers'
    })

  if (pathname.startsWith('/_sites')) return new Response(null, { status: 404 })

  if (!pathname.includes('.')) {
    if (currentHost === 'dashboard') rewriteDashboard()
  }

  if (currentHost.includes('dashboard.')) return rewriteDashboard()

  if (hostname === 'localhost:9090' || hostname === 'uwebb.vercel.app') {
    url.pathname = `/home${pathname}`
    return NextResponse.rewrite(url)
  }

  url.pathname = `/_sites/${currentHost}${pathname}`

  // console.log('REWRITTEN URL :', url)
  // console.log('--------------MIDDLEWARE WORKER ENDED NEW-------------------')

  // return new Response(`This NextRouting BYPASSED by middleware. url: ${url}`)
  return NextResponse.rewrite(url)
}
