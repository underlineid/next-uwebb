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
      : hostname.replace('.localhost:9090', '')

  console.log('--------------MIDDLEWARE WORKER STARTED NEW-------------------')
  console.log('HOSTNAME: ', hostname)
  console.log('PATHNAME: ', pathname)
  console.log('CURRENT HOST: ', currentHost)

  if (!hostname)
    return new Response(null, {
      status: 400,
      statusText: 'No hostname found in request headers'
    })
  if (pathname.startsWith('/_sites')) return new Response(null, { status: 404 })
  else if (currentHost.includes('dashboard.'))
    url.pathname = `/dashboard${pathname}`
  else if (hostname === 'localhost:9090' || hostname === 'uwebb.vercel.app')
    url.pathname = `/home${pathname}`
  else url.pathname = `/_sites/${hostname}${pathname}`
  // else {
  //   if (pathname === '/') url.pathname = `/_sites/index.js`
  //   else url.pathname = `/_sites/[pageId].tsx`
  // }

  console.log('REWRITTEN URL :', url)
  console.log('--------------MIDDLEWARE WORKER ENDED NEW-------------------')

  // return new Response(`This NextRouting BYPASSED by middleware. url: ${url}`)
  return NextResponse.rewrite(url)
}
