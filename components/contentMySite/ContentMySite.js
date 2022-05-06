import { message } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUserId, supabaseClient } from '../../helper/util'
import { setSiteUser } from '../../redux/siteUser'
import ButtonAdd from '../button/ButtonAdd'

import ContentBox from '../contentBox/ContentBox'
import PopupAddSite from '../popup/popupAddSite/PopupAddSite'
import YourSite from '../yourSite/YourSite'

const supa = supabaseClient()

export default function ContentMySite({ sectionTitle = 'Your Sites' }) {
  const [openModal, setOpenModal] = useState(false)

  const doOpenModal = () => setOpenModal(true)

  const dispatch = useDispatch()

  const getSiteList = useCallback(
    async (callback) => {
      message.destroy()
      const userId = getUserId()

      const { data: site, error } = await supa
        .from('site')
        .select('*')
        .eq('user', userId)

      setTimeout(() => {
        if (site) {
          if (site.length < 1) dispatch(setSiteUser('empty'))
          else if (site.length > 0) dispatch(setSiteUser(site))

          if (typeof callback === 'function') callback()
        } else {
          message.error(error.message)
          setTimeout(getSiteList, 3000, callback)
        }
      }, 1000)
    },
    [dispatch]
  )

  const onSuccessAddSite = () => {
    const callback = () => setOpenModal(false)
    getSiteList(callback)
  }

  useEffect(() => {
    getSiteList()
  }, [getSiteList])

  return (
    <>
      <ContentBox
        title={sectionTitle}
        rightTitle={<ButtonAdd onClick={doOpenModal}>Add New Site</ButtonAdd>}
      >
        <YourSite />
      </ContentBox>
      <PopupAddSite
        isOpen={openModal}
        setOpen={setOpenModal}
        onSuccess={onSuccessAddSite}
      />
    </>
  )
}
