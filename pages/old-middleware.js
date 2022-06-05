import { NextRequest } from 'next/server'

export function middleware(request) {
  console.log('The Request: ', { request })
  const country = request.geo.country || 'Unidentified Country'
  return new Response(
    `Hello world to : ${country}. /n ${JSON.stringify(request)}`
  )
}
