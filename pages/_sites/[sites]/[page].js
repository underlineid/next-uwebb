import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Index() {
  const { pathname, query } = useRouter()

  return (
    <div style={{ padding: 30 }}>
      <h2>THIS IS MULTI TENANT PAGES SUB-PAGE</h2>
      <p>
        <h4>Sites: {query.sites}</h4>
        <h4>Page: {query.page}</h4>
        Path is: <u>{pathname}</u>
      </p>
      <p style={{ padding: 20 }}>
        <Link href='/'>Back to Home</Link>
      </p>
    </div>
  )
}
