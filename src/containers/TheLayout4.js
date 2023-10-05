import React from 'react'
import {
  TheContent,
  TheSidebar4,
  TheFooter,
  TheHeader
} from './index4'

const TheLayout = () => {

  return (
    <div className="c-app c-default-layout">
      <TheSidebar4/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
