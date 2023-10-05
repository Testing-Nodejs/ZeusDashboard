import React from 'react'
import {
  TheContent,
  TheSidebar5,
  TheFooter,
  TheHeader
} from './index5'

const TheLayout = () => {

  return (
    <div className="c-app c-default-layout">
      <TheSidebar5/>
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
