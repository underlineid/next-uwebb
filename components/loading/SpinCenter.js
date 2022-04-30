import { Spin } from 'antd'
import React from 'react'

export default function SpinCenter({ size = 'medium', absoluteCenter }) {
  let style = { textAlign: 'center', margin: '0 auto' }
  if (absoluteCenter)
    style = {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)'
    }

  return (
    <div style={style}>
      <Spin size={size} />
    </div>
  )
}
