import React from 'react'
import Header from './Admin/Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import Sidebar from './Admin/Sidebar'

const AdminLayout = () => {
  return (
    <div>
      <Header />
      <div className="grid grid-cols-12 min-h-80vh h-auto">
        <div className="col-span-2">
          <Sidebar />
        </div>
        <div className="col-span-10 px-4">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AdminLayout
