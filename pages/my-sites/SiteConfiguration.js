import { Button, Select, Upload } from 'antd'
import React from 'react'
import ContentBox from '../../components/contentBox/ContentBox'
import SiteSettingRow from './SiteSettingRow'
import style from './SiteDetailOverview.module.scss'
import { UploadOutlined } from '@ant-design/icons'

const { Option } = Select

const sizeList = [12, 14, 16, 18, 20, 22, 24, 26, 28]

const familyList = ['default', 'Roboto', 'Myriad Pro']

export default function SiteConfiguration({ site, holdEdit }) {
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
              <Select defaultValue='default' className={style.width100}>
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
              <Select defaultValue='16'>
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
              <Upload maxCount={1}>
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </SiteSettingRow>
          </div>
        </div>
      </ContentBox>
    </>
  )
}
