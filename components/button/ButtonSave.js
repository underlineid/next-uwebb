import { SaveOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'

export default function ButtonSave({
  onSave,
  onClick,
  disabled,
  loading,
  text = 'Save',
  children,
  icon = <SaveOutlined />
}) {
  return (
    <Button
      icon={icon}
      type='primary'
      onClick={onClick || onSave}
      disabled={disabled}
      loading={loading}
    >
      {children || text}
    </Button>
  )
}
