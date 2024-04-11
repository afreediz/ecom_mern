import React from 'react'
import Header from './Admin/Header'
import Footer from './Footer'

const AdminLayout = ({children}) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default AdminLayout
