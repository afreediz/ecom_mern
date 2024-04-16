import React from 'react'
import Header from './Admin/Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div>
      <Header />
        <Outlet />
      <Footer />
    </div>
  )
}

export default AdminLayout
