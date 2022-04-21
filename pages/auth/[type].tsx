import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AuthText, AuthGoogleButton, AuthTextOffer } from './AuthViews'
import UwebbLogo from '../../public/legal/uwebb-logo'

export default function AuthType() {
  const [loading, setLoading] = useState(false)
  const [view, setView] = useState('')

  const { query } = useRouter()

  useEffect(() => {
    console.log(query)
    if (query.type === 'login') setView('login')
    else if (query.type === 'register') setView('register')
  }, [query])

  const onSuccess = (val = {}) => {
    console.log('login success: ', val)
  }

  const onFailed = (val = {}) => {
    console.log('login failed: ', val)
  }

  return (
    <section className={'Login'}>
      <h1 className='display-none'>uWebb login</h1>
      <div className={`${'wrapper'} ${view}`}>
        <div className={'formLogin'}>
          <div className={'loginInside'}>
            <div>
              <UwebbLogo />
            </div>
            <AuthText step={view} />
            <AuthGoogleButton
              step={view}
              loading={loading}
              setLoading={setLoading}
              onSuccess={onSuccess}
              onFailed={onFailed}
            />
            <AuthTextOffer step={view} />
          </div>
        </div>
        <div className={`formRegister`}>
          <div className={`registerInside`}>
            <div>
              <UwebbLogo />
            </div>
            <AuthText step={view} />
            <AuthGoogleButton
              step={view}
              loading={loading}
              setLoading={setLoading}
              onSuccess={onSuccess}
              onFailed={onFailed}
            />
            <AuthTextOffer step={view} />
          </div>
        </div>
      </div>
    </section>
  )
}
