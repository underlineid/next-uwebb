import { Button, Card, Input, message, Select, Upload } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import ContentBox from '../../components/contentBox/ContentBox'
import SiteSettingRow from './SiteSettingRow'
import style from './SiteDetailOverview.module.scss'
import { UploadOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { setFontGroup, setFontList, setFontType } from '../../redux/fontList'
import { arrayGroupBy, supabaseClient } from '../../helper/util'
import SpinCenter from '../../components/loading/SpinCenter'

const supa = supabaseClient()

const { Option, OptGroup } = Select
const { TextArea } = Input

const sizeList = [12, 14, 16, 18, 20, 22, 24, 26, 28]

export default function SiteConfiguration({ values, setFieldValue }) {
  const [icon, setIcon] = useState([])

  const dispatch = useDispatch()
  const fontList = useSelector(({ fontList }) => fontList.value)
  const fontType = useSelector(({ fontList }) => fontList.type)
  const fontGroup = useSelector(({ fontList }) => fontList.grouped)

  const { siteConfig } = values
  const fontFamily = siteConfig.fontFamily || fontList[0].font_key
  const fontSize = siteConfig.fontSize || sizeList[0]
  const metaDescription = siteConfig.metaDescription || ''

  const getFontList = useCallback(async () => {
    message.destroy()
    const { data, error } = await supa.from('font_list')
    if (error) message.error(`font list: ${error.message}`, 3000)
    else if (data) {
      const grouped = arrayGroupBy(data, 'font_type')
      console.log('font grouped: ', grouped)
      dispatch(setFontList(data))
      dispatch(setFontGroup(grouped))
    }
  }, [dispatch])

  const getFontType = useCallback(async () => {
    message.destroy()
    const { data, error } = await supa.from('font_type')
    if (error) message.error(`font type: ${error.message}`, 3000)
    else if (data) dispatch(setFontType(data))
    console.log('Font type: ', data, error)
    if (!fontList || data) getFontList(data)
  }, [getFontList, fontList, dispatch])

  const fileChange = (e) => {
    console.log('file change:', e)
    setIcon(e.fileList)
  }

  const onChangeDesc = (e) => {
    setFieldValue('siteConfig', { ...siteConfig, metaDescription: e })
  }

  const onChangeFamily = (e) => {
    setFieldValue('siteConfig', { ...siteConfig, fontFamily: e })
  }

  const onChangeSize = (e) => {
    setFieldValue('siteConfig', { ...siteConfig, fontSize: e })
  }

  useEffect(() => {
    if (!fontType) getFontType()
  }, [fontType, getFontType])

  return (
    <>
      {/* <SiteDetailHeader site={site} holdEdit={holdEdit} /> */}
      {!fontList || !fontGroup ? (
        <SpinCenter size='large' />
      ) : (
        <ContentBox>
          <div className='flex align-top insideHalf'>
            <div>
              <SiteSettingRow
                head='Custom Font'
                subHead='Ubah font default notion menjadi font favorit kamu.'
              >
                <Select
                  defaultValue={fontFamily}
                  className={style.width100}
                  onChange={onChangeFamily}
                >
                  {fontGroup.map((group, index) => (
                    <OptGroup
                      label={
                        fontType.find((i) => i.id === group[0].font_type)
                          .type_name
                      }
                      key={index}
                    >
                      {group.map(({ id, font_name: font, font_key: key }) => (
                        <Option value={key} key={id}>
                          {font}
                          {console.log(`font: `, font, key)}
                        </Option>
                      ))}
                    </OptGroup>
                  ))}
                </Select>
              </SiteSettingRow>
              <SiteSettingRow
                head='Ukuran Font'
                subHead='Ubah ukuran font default sesuai kebutuhanmu.'
              >
                <Select
                  fieldNames='fontSize'
                  onChange={onChangeSize}
                  defaultValue={fontSize}
                >
                  {sizeList.map((size) => (
                    <Option value={size} key={size}>
                      {size}
                    </Option>
                  ))}
                </Select>
              </SiteSettingRow>
              <br />
              <br />
              <Card type='inner' title='Example font'>
                <div className={`example-font size-${fontSize} ${fontFamily} `}>
                  The quick brown fox jump over the lazy dogs.
                </div>
              </Card>
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
                  value={metaDescription}
                  onChange={onChangeDesc}
                  autoSize={{ minRows: 3, maxRows: 5 }}
                  placeholder='My website description...'
                />
              </SiteSettingRow>
            </div>
          </div>
        </ContentBox>
      )}
    </>
  )
}
