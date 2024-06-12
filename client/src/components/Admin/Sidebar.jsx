import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaTachometerAlt, FaShoppingCart, FaUsers, FaBox, FaTags } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className='w-full bg-gray-900 text-white font-medium text-xl p-6 min-h-screen'>
      <ul className='list-none flex flex-col gap-6'>
        <Link to="/admin" className={`flex items-center md:p-1 lg:p-2 rounded-lg transition-colors ${location.pathname === '/admin' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
          <FaTachometerAlt className='md:mr-3  min-w-2' />
          <li className=' max-lg:hidden'>Dashboard</li>
        </Link>
        <Link to="/admin/orders" className={`flex items-center md:p-1 lg:p-2 rounded-lg transition-colors ${location.pathname === '/admin/orders' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
          <FaShoppingCart className='md:mr-3 ' />
          <li className=' max-lg:hidden'>Orders</li>
        </Link>
        <Link to="/admin/users" className={`flex items-center md:p-1 lg:p-2 rounded-lg transition-colors ${location.pathname === '/admin/users' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
          <FaUsers className='md:mr-3 ' />
          <li className=' max-lg:hidden'>Users</li>
        </Link>
        <Link to="/admin/products" className={`flex items-center md:p-1 lg:p-2 rounded-lg transition-colors ${location.pathname === '/admin/products' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
          <FaBox className='md:mr-3 ' />
          <li className=' max-lg:hidden'>Products</li>
        </Link>
        <Link to="/admin/categories" className={`flex items-center md:p-1 lg:p-2 rounded-lg transition-colors ${location.pathname === '/admin/categories' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
          <FaTags className='md:mr-3 ' />
          <li className=' max-lg:hidden'>Categories</li>
        </Link>
      </ul>
    </div>
  );

}

export default Sidebar
