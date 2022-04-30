import React from 'react'
import { useEffect } from 'react'
import ContentBox from '../../components/contentBox/ContentBox'
import SpinCenter from '../../components/loading/SpinCenter'
import WithAuthentication from '../../components/withAuthentication/WithAuthentication'
import WithNavigation from '../../components/WithNavigation/WithNavigation'
import { logouting } from '../../helper/util'

export default function Logout() {
  useEffect(() => {
    setTimeout(() => {
      logouting()

      setTimeout(() => {
        window.location.href = '/auth/login'
      }, 1000)
    }, 3000)
  }, [])

  return (
    <WithAuthentication>
      <WithNavigation>
        <ContentBox>
          <div className='in-center'>
            <h3>Sedang melakukan logout...</h3>
            <SpinCenter size='large' />
          </div>
        </ContentBox>
      </WithNavigation>
    </WithAuthentication>
  )
}
