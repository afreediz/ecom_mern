import React from 'react'
import Sidebar from '../utilities/Sidebar'

const SidebarLayout = ({children}) => {
  return (
    <div className=' grid grid-cols-5'>
      <div className=" col-span-1">
        <Sidebar />
      </div>
      <div className=" col-span-4 p-8">
        {children}
      </div>
    </div>
  )
}

export default SidebarLayout
