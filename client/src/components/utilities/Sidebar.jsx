import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-full bg-black text-white font-medium text-3xl p-8 min-h-50vh'>
      <ul className=' list-none flex flex-col gap-4'>
        <Link to='/dashboard' className='border-b-2 border-slate-500' ><li>Dashboard</li></Link>
        <Link to='profile' className='border-b-2 border-slate-500' ><li>Porfile</li></Link>
        <Link to='orders'className='border-b-2 border-slate-500' ><li>Orders</li></Link>
      </ul>
    </div>
  )
}

export default Sidebar
