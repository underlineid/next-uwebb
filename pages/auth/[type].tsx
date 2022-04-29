import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AuthText, AuthGoogleButton, AuthTextOffer } from './AuthViews'
import UwebbLogo from '../../public/legal/uwebb-logo'
import { loggingIn, supabaseClient } from 'helper/util'

const supabase = supabaseClient()

export default function AuthType() {
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState('')
  const [page, setPage] = useState('')

  const { query, replace } = useRouter()

  useEffect(() => {
    if (query.type === 'login') {
      setStep('login')
      setPage('login')
    } else if (query.type === 'register') {
      setStep('register')
      setPage('register')
    } else replace('/auth/login')
  }, [query])

  const setUser = (user) => {
    console.log('data user', user, user[0])

    loggingIn(JSON.stringify(user[0]))

    setTimeout(() => {
      window.location.href = '/dashboard'
    }, 3000)
  }

  const checkUser = async (profile) => {
    console.log('Check in : ', profile)
    const email = profile.email
    const { data: user, error } = await supabase
      .from('user')
      .select('*')
      .eq('email', email)
    console.log('User fetch:', user, error)
    setTimeout(setLoading, 3000, false)
    if (user && user.length > 0) {
      setStep('successLogin')
      setUser(user)
    } else setStep('userNotFound')
  }

  const onSuccess = async (val) => {
    setStep('onValidating')
    if (!val.profileObj) setStep('userNotFound')
    setTimeout(checkUser, 1000, val.profileObj)
    console.info('Google Profile: ', val)
  }

  const onFailed = (val) => {
    setLoading(false)
    console.warn('Login Failed: ', val)
  }

  return (
    <section className={'Login'}>
      <h1 className='display-none'>uWebb login</h1>
      <div className={`${'wrapper'} ${page}`}>
        <div className={'formLogin'}>
          <div className={'loginInside'}>
            <div>
              <UwebbLogo />
            </div>
            <AuthText step={step} />
            <AuthGoogleButton
              step={step}
              loading={loading}
              setLoading={setLoading}
              onSuccess={onSuccess}
              onFailed={onFailed}
            />
            <AuthTextOffer step={step} />
          </div>
        </div>
        <div className={`formRegister`}>
          <div className={`registerInside`}>
            <div>
              <UwebbLogo />
            </div>
            <AuthText step={step} />
            <AuthGoogleButton
              step={step}
              loading={loading}
              setLoading={setLoading}
              onSuccess={onSuccess}
              onFailed={onFailed}
            />
            <AuthTextOffer step={step} />
          </div>
        </div>
      </div>
    </section>
  )
}
