import React from 'react'
import {Outlet} from 'react-router-dom'
import Sidebar from '../utilities/Sidebar';

const Private = () => {
  console.log('on private routes');
  return (
    <div className=' grid grid-cols-5'>
      <div className=" col-span-1">
        <Sidebar />
      </div>
      <div className=" col-span-4 p-8">
        <Outlet />
      </div>
    </div>
  )
}

export default Private
