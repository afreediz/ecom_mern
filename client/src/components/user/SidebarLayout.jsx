import React from 'react'
import Sidebar from '../utilities/Sidebar'

const SidebarLayout = ({children}) => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-5 gap-4'>
      <div className="lg:col-span-1">
        <Sidebar />
      </div>
      <div className="lg:col-span-4 bg-gray-50 p-8 shadow-lg rounded-lg">
        {children}
      </div>
    </div>
  );
}

export default SidebarLayout
