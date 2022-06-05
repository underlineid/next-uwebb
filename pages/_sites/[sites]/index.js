import { Spin } from 'antd'
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { setUwebbSite } from '../../../redux/uwebbSite'
import { getSubdomain, supabaseClient } from '../../../helper/util'
import { PageHead } from '../../../components/PageHead'

const supa = supabaseClient()

export default function Index() {
  const site = useSelector((state) => state.uwebbSite.value)
  const dispatch = useDispatch()

  const { pathname: path, query } = useRouter()

  const userDom = getSubdomain(query.sites)

  useEffect(() => {
    const fetchSite = async (siteUrl) => {
      console.log('Fetching site...')
      const { data, error } = await supa
        .from('site')
        .select('*')
        .eq('site_url', siteUrl)
      if (data) {
        console.log('Fetching done...', { data, error })
        dispatch(setUwebbSite(data[0]))
      } else dispatch(setUwebbSite('uwebbNotFound'))
    }

    if (userDom) fetchSite(userDom)
  }, [userDom, dispatch])

  useEffect(() => {
    if (site && typeof site === 'object' && site.configuration.fontFamily)
      document.body.classList.add(site.configuration.fontFamily)
  }, [site])

  console.log('SITE LOADER: ', site)

  let view = (
    <div>
      <Spin />
    </div>
  )
  if (site === 'uwebbNotFound') view = <h1>uWebb site Not Found</h1>
  else if (site && typeof site === 'object')
    view = (
      <Fragment>
        <PageHead
          title={site.configuration.metaTitle || ''}
          description={site.configuration.metaDescription || ''}
          image=''
          url={query.sites}
        />
        <div style={{ padding: 30 }}>
          <h2>THIS IS MULTI TENANT PAGES LANDING</h2>
          <p>
            <h4>Site: {query.sites}</h4>
            Path is: <u>{path}</u>
          </p>
          <p style={{ padding: 20 }}>
            <Link href='/profile'>profile</Link>
            <br />
            <Link href='/article'>article</Link>
          </p>
          <p className='font-changes'>
            <h2>THIS FONT WILL BE CHANGES EQUAL SETTING</h2>
          </p>
          <p>
            <br />
            {JSON.stringify(site)}
          </p>
        </div>
      </Fragment>
    )

  return view
}
