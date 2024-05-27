import React from 'react'
import { Link } from 'react-router-dom'
import { FaTachometerAlt, FaShoppingCart, FaUsers, FaBox, FaTags } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className='w-full bg-gray-900 text-white font-medium text-xl p-6 min-h-screen'>
      <ul className='list-none flex flex-col gap-6'>
        <Link to="/admin" className='flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors'>
          <FaTachometerAlt className='mr-3' />
          <li>Dashboard</li>
        </Link>
        <Link to="/admin/orders" className='flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors'>
          <FaShoppingCart className='mr-3' />
          <li>Orders</li>
        </Link>
        <Link to="/admin/users" className='flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors'>
          <FaUsers className='mr-3' />
          <li>Users</li>
        </Link>
        <Link to="/admin/products" className='flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors'>
          <FaBox className='mr-3' />
          <li>Products</li>
        </Link>
        <Link to="/admin/categories" className='flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors'>
          <FaTags className='mr-3' />
          <li>Categories</li>
        </Link>
      </ul>
    </div>
  );
}

export default Sidebar
