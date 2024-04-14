import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const options = ['Womens', 'Mens', 'Children', 'Cloths']; // Your list of options
  return (
    <div className='flex px-16 py-4 text-xl items-center justify-between bg-black text-white border-2 border-slate-800'>
      <div className="font-medium logo text-4xl ">ECOM</div>
      <div className="search">
        <input type="text" className='p-2 text-black' placeholder='search products' />
      </div>
      <ul className='list flex list-none items-center'>
        <Link to="/"><li className='px-3'>Home</li></Link>
        <Link to="/dashboard"><li className='px-3'>Dashboard</li></Link>
        <Link to="#">

        <div className="relative">
      <select
        className="text-white bg-black block appearance-none px-4 py-2 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        <option className='' value="">All categories</option>
        {options.map((option, index) => (
          <option className='bg-white text-black font-normal' key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>

        </Link>
        <Link to="/register"><li className='px-3'>Register</li></Link>
        <Link to="/login"><li className='px-3'>Login</li></Link>
        <Link to="/cart"><li className='px-3'>Cart</li></Link>
      </ul>
    </div>
  )
}

export default Header
