import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-full bg-black text-white font-medium text-3xl p-8 min-h-50vh'>
      <ul className='list-none flex flex-col gap-4'>
        <Link to="/admin" ><li className='border-b-2 border-slate-500'>Dashboard</li></Link>
        <Link to="/admin/orders" ><li className='border-b-2 border-slate-500'>Orders</li></Link>
        <Link to="/admin/users" ><li className='border-b-2 border-slate-500'>Users</li></Link>
        <Link to="/admin/products" ><li className='border-b-2 border-slate-500'>Products</li></Link>
        <Link to="/admin/categories" ><li className='border-b-2 border-slate-500'>Categories</li></Link>
      </ul>
    </div>
  )
}

export default Sidebar
