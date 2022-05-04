import { getLoginStatus } from 'helper/util'
import Link from 'next/link'
import React from 'react'

export default function NextUwebb() {
  const isLoggedIn = getLoginStatus()

  return (
    <div>
      <h2>hHehehehe</h2>
      {isLoggedIn && isLoggedIn.status ? (
        <p>Kamu Sudah Login Ya</p>
      ) : (
        <p>
          <p>
            <Link href='/auth/login'>
              <a className='link'>Login</a>
            </Link>
          </p>
          <p>
            <Link href='/auth/register'>
              <a className='link'>Register</a>
            </Link>
          </p>
        </p>
      )}
    </div>
  )
}
