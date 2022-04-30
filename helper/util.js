import { createClient } from '@supabase/supabase-js'
import jsCookie from 'js-cookie'

export const setCookie = (name, value, expires = 1) =>
  jsCookie.set(name, value, { expires })

export const getCookie = (name) => jsCookie.get(name)

export const removeCookie = (name) => jsCookie.remove(name)

const cookieNameForUser = 'uwebb-user-info'

export const loggingIn = (user) => {
  setCookie('is-login', true)
  setCookie(cookieNameForUser, user)
}

export const logouting = () => {
  removeCookie('is-login')
  removeCookie(cookieNameForUser)
}

export const getLoginStatus = () => {
  let ret = false
  const isLogin = getCookie('is-login')
  const isUser = getCookie(cookieNameForUser)
  if (isLogin && isUser) ret = { status: isLogin, user: isUser }
  else ret = 'not-logged-in'
  return ret
}

export const userSaved = () => getCookie(cookieNameForUser)

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
