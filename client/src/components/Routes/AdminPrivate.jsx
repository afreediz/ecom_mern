import React from 'react'
import {Outlet} from 'react-router-dom'

const AdminPrivate = () => {
  return (
    <div>
      admin route
      <Outlet />
    </div>
  )
}

export default AdminPrivate
