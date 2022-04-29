import React from 'react'
import { Button } from 'antd'
import { PlusCircleFilled as Plus } from '@ant-design/icons'

export default function ButtonAdd({ children, onClick, ...otherProps }) {
  return (
    <Button type='primary' onClick={onClick} icon={<Plus />} {...otherProps}>
      {children}
    </Button>
  )
}
