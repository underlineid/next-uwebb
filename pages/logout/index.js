import { useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ContentBox from '../../components/contentBox/ContentBox'
import SpinCenter from '../../components/loading/SpinCenter'
import WithAuthentication from '../../components/withAuthentication/WithAuthentication'
import WithNavigation from '../../components/WithNavigation/WithNavigation'
import { logouting } from '../../helper/util'
import { setSiteUser } from '../../redux/siteUser'

export default function Logout() {
  const { replace } = useRouter()

  const dispatch = useDispatch()

  useEffect(() => {
    const redirect = () => {
      dispatch(setSiteUser(false))
      replace('/')
    }

    setTimeout(logouting, 3000, redirect)
  }, [replace, dispatch])

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
