import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../context/user'
import { api_url } from '../datas'
import axios from 'axios'

const Header = () => {
  const {user, setUser} = useContext(userContext)
  const [categories, setCategories] = useState()
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/login')
  }
  useEffect(()=>{
    async function getCategory(){
      try{
        const {data} = await axios.get(api_url+'category')
        setCategories(data.categories)
      }catch({response}){
        console.log(response);
      }
    }
    getCategory()
  },[])
  const navigateCategory = (e) => {
    console.log('doing');
    const selectedCategory = e.target.value;
    navigate(`/category/${selectedCategory}`)
  }
  const options = ['Womens', 'Mens', 'Children', 'Cloths']; // Your list of options
  return (
    <div className='flex px-16 py-4 text-xl items-center justify-between bg-black text-white border-2 border-slate-800'>
      <div className="font-medium logo text-4xl ">ECOM</div>
      <div className="search">
        <input type="text" className='p-2 text-black' placeholder='search products' />
      </div>
      <div className='list flex list-none items-center'>
        <Link to="/"><li className='px-3'>Home</li></Link>
        <div className="relative">
          <select
            onChange={navigateCategory}
            className="text-white bg-black block appearance-none px-4 py-2 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option className='' to="/" value=""><Link to="/">All categories</Link></option>
            {categories && categories.map((category, index) => (
              <option className='bg-white text-black font-normal' key={index} value={category.slug}>
                {category.name}
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
        {user?
        <>
          <Link to="/dashboard"><li className='px-3'>Dashboard</li></Link>
          <button onClick={logout} className=' py-2 px-4 bg-red-500 text-white font-normal rounded-sm'> Logout </button>
        </>
        :
        <>
          <Link to="/register"><li className='px-3'>Register</li></Link>
          <Link to="/login"><li className='px-3'>Login</li></Link>
        </>
        }
        <Link to="/cart"><li className='px-3'>Cart</li></Link>
      </div>
    </div>
  )
}

export default Header
