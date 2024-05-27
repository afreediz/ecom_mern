import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-full bg-gray-900 text-white font-medium text-2xl p-8 min-h-screen lg:min-h-50vh rounded-lg shadow-lg'>
      <ul className='list-none flex flex-col gap-6'>
        <Link to='/dashboard' className='border-b-2 border-slate-500 pb-2 hover:text-blue-400'>
          <li>Dashboard</li>
        </Link>
        <Link to='/profile' className='border-b-2 border-slate-500 pb-2 hover:text-blue-400'>
          <li>Profile</li>
        </Link>
        <Link to='/orders' className='border-b-2 border-slate-500 pb-2 hover:text-blue-400'>
          <li>Orders</li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar
