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

export const isFunction = (fn) => {
  return typeof fn === 'function'
}

export const logouting = (callback) => {
  removeCookie('is-login')
  removeCookie(cookieNameForUser)

  if (isFunction(callback)) setTimeout(callback, 1500)
}

export const getLoginStatus = () => {
  let ret = { status: false, user: false }
  const isLogin = getCookie('is-login')
  const isUser = getCookie(cookieNameForUser)
  if (isLogin && isUser) ret = { status: isLogin, user: isUser }
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

export const arrayGroupBy = (array = [], key) => {
  if (!array || typeof array !== 'object' || array.length < 1) return []
  return Object.values(
    array.reduce((r, a) => {
      r[a[key]] = [...(r[a[key]] || []), a]
      return r
    }, {})
  )
}
