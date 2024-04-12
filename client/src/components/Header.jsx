import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='flex px-16 py-4 text-xl items-center justify-between bg-black text-white border-2 border-slate-800'>
      <div className="font-medium logo text-4xl ">ECOM</div>
      <div className="search">
        <input type="text" className='p-2 text-black' placeholder='search products' />
      </div>
      <ul className='list flex list-none'>
        <Link to="/"><li className='px-3'>Home</li></Link>
        <Link to="#"><li className='px-3'>Categories</li></Link>
        <Link to="/register"><li className='px-3'>Register</li></Link>
        <Link to="/login"><li className='px-3'>Login</li></Link>
        <Link to="/cart"><li className='px-3'>Cart</li></Link>
      </ul>
    </div>
  )
}

export default Header
