import { Button, Input, Select, Upload } from 'antd'
import React, { useState } from 'react'
import ContentBox from '../../components/contentBox/ContentBox'
import SiteSettingRow from './SiteSettingRow'
import style from './SiteDetailOverview.module.scss'
import { UploadOutlined } from '@ant-design/icons'

const { Option } = Select
const { TextArea } = Input

const sizeList = [12, 14, 16, 18, 20, 22, 24, 26, 28]

const familyList = ['default', 'Roboto', 'Myriad Pro']

export default function SiteConfiguration({ site, holdEdit }) {
  const [icon, setIcon] = useState([])
  const [size, setSize] = useState(sizeList[0])
  const [family, setFamily] = useState(familyList[0])
  const [metaDesc, setDesc] = useState('')

  const fileChange = (e) => {
    console.log('file change:', e)
    setIcon(e.fileList)
  }

  const onChangeDesc = (e) => setDesc(e.target.value || '')

  return (
    <>
      {/* <SiteDetailHeader site={site} holdEdit={holdEdit} /> */}
      <ContentBox>
        <div className='flex align-top insideHalf'>
          <div>
            <SiteSettingRow
              head='Custom Font'
              subHead='Ubah font default notion menjadi font favorit kamu.'
            >
              <Select defaultValue={family} className={style.width100}>
                {familyList.map((family) => (
                  <Option key={family} value={family}>
                    {family}
                  </Option>
                ))}
              </Select>
            </SiteSettingRow>
            <SiteSettingRow
              head='Ukuran Font'
              subHead='Ubah ukuran font default sesuai kebutuhanmu.'
            >
              <Select defaultValue={size}>
                {sizeList.map((size) => (
                  <Option value={size} key={size}>
                    {size}
                  </Option>
                ))}
              </Select>
            </SiteSettingRow>
          </div>
          <div>
            <SiteSettingRow
              head='Upload Favicon'
              subHead='Upload favicon sebagai identitas icon website kamu.'
            >
              <Upload
                maxCount={1}
                listType='picture'
                onChange={fileChange}
                fileList={icon}
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </SiteSettingRow>
            <SiteSettingRow
              head='Deskripsi Web'
              subHead='Deskripsikan website kamu agar mudah dicari pada mesin pencari (Google, Bing, dll.)'
            >
              <TextArea
                value={metaDesc}
                onChange={onChangeDesc}
                autoSize={{ minRows: 3, maxRows: 5 }}
                placeholder='My website description...'
              />
            </SiteSettingRow>
          </div>
        </div>
      </ContentBox>
    </>
  )
}
