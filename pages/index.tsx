import { getLoginStatus } from 'helper/util'
import Link from 'next/link'
import React from 'react'

export default function NextUwebb({ mainProps = 'hehehe' }) {
  const isLoggedIn = getLoginStatus()

  return (
    <div>
      <h2>hHehehehe</h2>
      {isLoggedIn && isLoggedIn !== 'not-logged-in' ? (
        <p>Kamu Sudah Login Ya</p>
      ) : (
        <p>
          <p>
            <Link href='/auth/login'>Login</Link>
          </p>
          <p>
            <Link href='/auth/register'>Register</Link>
          </p>
        </p>
      )}
    </div>
  )
}
