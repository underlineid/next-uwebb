import React, { useEffect, useState } from 'react'
import {
  HomeFilled,
  BookFilled,
  CompassFilled,
  CreditCardFilled,
  SwitcherFilled,
  CloseCircleFilled,
  CaretLeftFilled
} from '@ant-design/icons'
import { useRouter } from 'next/router'
import Link from 'next/link'
import UwebbLogo from '../../public/legal/uwebb-logo'
import { getCookie, removeCookie, setCookie } from '../../helper/util'
import style from './navigation.module.scss'

const menulist = [
  { icon: <HomeFilled />, text: 'Dashboard', url: '/dashboard' },
  { icon: <CompassFilled />, text: 'My Sites', url: '/my-sites' },
  { icon: <BookFilled />, text: 'Template Resources', url: '/template' },
  { icon: <BookFilled />, text: 'Showcase', url: '/showcase' },
  { icon: <SwitcherFilled />, text: 'Documentation', url: '/documentation' },
  { icon: <CreditCardFilled />, text: 'Subscription', url: '/subscription' }
]

const menuBottom = [
  { icon: <CloseCircleFilled />, text: 'Logout', url: '/logout' }
]

const LinkItem = ({ url, path = '', icon, text, addClass }) => {
  const defClass = style.menuItem
  const isActive = path === url || path.includes(url)
  const actClass = isActive ? style.active : ''
  const logoutClass = url === '/logout' ? style.logout : ''
  const className = `${defClass} ${actClass} ${logoutClass} ${addClass}`
  return (
    <Link href={url} title={text}>
      <div className={className}>
        <div className={style.icon}>{icon}</div>
        <div className={style.navname}>{text}</div>
      </div>
    </Link>
  )
}

export default function Navigation() {
  const [isCollapsed, setCollapsed] = useState(false)

  const { pathname: path } = useRouter()

  const menuCollapsed = getCookie('menuCollapsed')

  const collapser = isCollapsed ? style.collapsed : ''

  const clickCollapser = () => {
    if (isCollapsed) removeCookie('menuCollapsed')
    else setCookie('menuCollapsed', true, 7)
    setCollapsed(!isCollapsed)
  }

  useEffect(() => {
    setCollapsed(menuCollapsed)
  }, [menuCollapsed])

  return (
    <div className={`${style.uwebbNavigator} ${collapser}`}>
      <div className={`${style.Navigation} ${collapser}`}>
        <div>
          <div className={style.blockLogo}>
            <div className={style.logoBar}>
              <UwebbLogo />
            </div>
          </div>
          <div className={`${style.menuList} ${collapser}`}>
            {menulist.map((item) => (
              <LinkItem
                addClass={collapser}
                path={path}
                {...item}
                key={item.url}
              />
            ))}
          </div>
        </div>
        <div>
          {menuBottom.map((item) => (
            <LinkItem
              addClass={collapser}
              path={path}
              {...item}
              key={item.url}
            />
          ))}
          <div className={`${style.collapser} ${collapser}`}>
            <button onClick={clickCollapser}>
              <CaretLeftFilled />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
