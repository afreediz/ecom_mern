import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../../context/user'
import { api_url } from '../../datas'
import axios from 'axios'

const Header = () => {
  const {user, setUser} = useContext(userContext)
  const [categories, setCategories] = useState()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/login')
  }
  return (
    <div className='flex px-16 py-4 text-xl items-center justify-between bg-black text-white border-2 border-slate-800'>
      <div className="font-medium logo text-4xl ">ADMIN PANEL</div>
      <form className="search" onSubmit={
        (e)=>{
          e.preventDefault()
          if (searchQuery == "") {
            navigate('/')
            return
          }
          navigate(`/search/${searchQuery}`)
        }
      }>
        <input onChange={(e)=>setSearchQuery(e.target.value)} value={searchQuery} type="text" className='p-2 text-black' placeholder='search products' />
      </form>
      <div className='list flex list-none items-center'>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
          </div>
        </div>
        <button onClick={logout} className=' py-2 px-4 bg-red-500 text-white font-normal rounded-sm'> Logout </button>
        <div className=" rounded-full bg-red-500 ml-4">
          <img className=' w-full max-w-10' src="https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Header
