import { createClient } from '@supabase/supabase-js'
import jsCookie from 'js-cookie'

export const setCookie = (name, value, expires = 1) =>
  jsCookie.set(name, value, { expires })

export const getCookie = (name) => jsCookie.get(name)

export const removeCookie = (name) => jsCookie.remove(name)

export const loggingIn = (user) => {
  setCookie('is-login', true)
  setCookie('user-info', user)
}

export const logouting = () => {
  removeCookie('is-login')
  removeCookie('user-info')
}

export const getLoginStatus = () => {
  const isLogin = getCookie('is-login')
  const isUser = getCookie('user-info')
  if (isLogin && isUser) return true
  return false
}

export const userSaved = () => getCookie('user-info')

export const getUserId = () => {
  const user = userSaved()
  if (user) {
    const obj = JSON.parse(user)
    return obj.id_user
  }
  return false
}

export const supabaseClient = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY
  )
