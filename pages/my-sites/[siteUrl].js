import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import WithAuthentication from '../../components/withAuthentication/WithAuthentication'
import { getUserId, supabaseClient } from '../../helper/util'
import { setSiteUser } from '../../redux/siteUser'
import SiteDetail from './SiteDetail'
import ContentBox from '../../components/contentBox/ContentBox'
import SpinCenter from '../../components/loading/SpinCenter'

const supabase = supabaseClient()

export default function MySiteDetail() {
  const [site, setSite] = useState(false)

  const router = useRouter()
  const siteUser = useSelector((state) => state.siteUser.value)
  const dispatch = useDispatch()

  const { siteUrl } = router.query

  const getSiteList = useCallback(
    async (callback) => {
      const userId = getUserId()

      const { data: site, error } = await supabase
        .from('site')
        .select('*')
        .eq('user', userId)

      setTimeout(() => {
        if (site) {
          if (site.length < 1) dispatch(setSiteUser('empty'))
          else if (site.length > 0) dispatch(setSiteUser(site))

          if (typeof callback === 'function') callback()
        } else console.error('get site error: ', error)
      }, 500)
    },
    [dispatch]
  )

  useEffect(() => {
    if (!siteUser) getSiteList('no siteUser')
    else {
      const target = siteUser.find((i) => i.url === siteUrl)
      if (target) setTimeout(setSite, 500, target)
    }
  }, [siteUser, getSiteList, siteUrl])

  let view = (
    <ContentBox>
      <SpinCenter size='large' />
    </ContentBox>
  )
  if (site) view = <SiteDetail site={site} onUpdate={getSiteList} />

  return <WithAuthentication>{view}</WithAuthentication>
}
