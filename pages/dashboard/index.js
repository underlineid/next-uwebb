import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ButtonAdd from '../../components/button/ButtonAdd'
import ContentBox from '../../components/contentBox/ContentBox'
import SpinCenter from '../../components/loading/SpinCenter'
import PageHeader from '../../components/pageHeader/PageHeader'
import PopupAddSite from '../../components/popup/popupAddSite/PopupAddSite'
import WithAuthentication from '../../components/withAuthentication/WithAuthentication'
import YourSite from '../../components/yourSite/YourSite'
import { getUserId, supabaseClient } from '../../helper/util'
import { setSiteUser } from '../../redux/siteUser'

const supabase = supabaseClient()

export default function Dashboard() {
  const [openModal, setOpenModal] = useState(false)

  const doOpenModal = () => setOpenModal(true)

  const siteUser = useSelector((state) => state.siteUser.value)
  const dispatch = useDispatch()

  const getData = useCallback(
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
      }, 3000)
    },
    [dispatch]
  )

  const onSuccessAddSite = () => {
    const callback = () => setOpenModal(false)
    getData(callback)
  }

  useEffect(() => {
    getData()
  }, [getData])

  let viewSite = <SpinCenter />
  if (siteUser === 'empty')
    viewSite = (
      <div className='in-center'>
        <div className='body-info-bold'>Kamu belum memiliki site</div>
        <div className='body-info-sub'>
          Buat site dengan menyalin link notion dan publish site kamu sekarang
        </div>
      </div>
    )
  else if (siteUser && siteUser.length > 0)
    viewSite = <YourSite siteList={siteUser} />

  return (
    <WithAuthentication>
      <PageHeader
        title='Dashboard Overview'
        subtitle='Publish notion anda menjadi website dengan super cepat!'
      />
      <ContentBox
        title='Your Sites'
        rightTitle={<ButtonAdd onClick={doOpenModal}>Add New Site</ButtonAdd>}
      >
        {viewSite}
      </ContentBox>
      <ContentBox title='This may can help you' />
      <PopupAddSite isOpen={openModal} setOpen={setOpenModal} />
    </WithAuthentication>
  )
}
