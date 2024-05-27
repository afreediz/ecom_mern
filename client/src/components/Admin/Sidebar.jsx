import React from 'react'

const Sidebar = () => {
  return (
    <div className='w-full bg-black text-white font-medium text-3xl p-8 min-h-50vh'>
      <ul className='list-none flex flex-col gap-4'>
        <li className='border-b-2 border-slate-500'>Dashboard</li>
        <li className='border-b-2 border-slate-500'>Orders</li>
        <li className='border-b-2 border-slate-500'>Users</li>
        <li className='border-b-2 border-slate-500'>Products</li>
        <li className='border-b-2 border-slate-500'>Categories</li>
      </ul>
    </div>
  )
}

export default Sidebar
