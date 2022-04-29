import React from 'react'
import Navigation from '../navigation/Navigation'

export default function WithNavigation({ children }) {
  return (
    <div className='uwebb-wrapper'>
      <Navigation />
      <div className='uwebb-panel'>{children}</div>
    </div>
  )
}
