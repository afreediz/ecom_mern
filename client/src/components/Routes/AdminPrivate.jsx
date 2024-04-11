import React from 'react'
import {Outlet} from 'react-router-dom'
import AdminLayout from '../AdminLayout'

const AdminPrivate = () => {
  return (
    <div>
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    </div>
  )
}

export default AdminPrivate
