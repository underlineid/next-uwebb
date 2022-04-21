import React from 'react'
import UwebbLogo from '../../assets/legal/uwebb-logo'
import style from './Login.module.scss'
import { useEffect, useState } from 'react'
import { AuthGoogleButton, AuthText, AuthTextOffer } from './AuthViews'
import { useLocation } from 'react-router-dom'
import { loggingIn, supabaseClient } from '../../helpers/util'

const supabase = supabaseClient()

function Auth() {
  const [step, setStep] = useState(false)
  const [page, setPage] = useState(false)
  const [loading, setLoading] = useState(false)

  const { pathname: path } = useLocation()

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

  useEffect(() => {
    if (path === '/login') {
      setStep('login')
      setPage('login')
    } else if (path === '/register') {
      setStep('register')
      setPage('register')
    }
  }, [path])

  return (
    <section className={style.login}>
      <h1 className='display-none'>uWebb login</h1>
      <div className={`${style.wrapper} ${style[page]}`}>
        <div className={style.formLogin}>
          <div className={style.loginInside}>
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
        <div className={style.formRegister}>
          <div className={style.registerInside}>
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

export default Auth
