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
  useEffect(()=>{
    async function getCategory(){
      try{
        const {data} = await axios.get(api_url+'category')
        setCategories(data.categories)
      }catch(error){
        console.log(error);
      }
    }
    getCategory()
  },[])
  const navigateCategory = (e) => {
    const selectedCategory = e.target.value;
    if(selectedCategory == "all"){
      navigate('/')
    }else{
    navigate(`/category/${selectedCategory}`)
    }
  }
  return (
    <div className='flex px-8 sm:px-16 py-4 text-xl items-center justify-between bg-gray-800 text-white border-b-2 border-slate-800'>
      <div className="font-bold logo text-4xl">
        <Link to="/">ECOM</Link>
      </div>
      <form className="search flex-grow mx-4" onSubmit={(e) => {
        e.preventDefault();
        if (searchQuery === "") {
          navigate('/');
          return;
        }
        navigate(`/search/${searchQuery}`);
      }}>
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          type="text"
          className='w-full p-2 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='Search products'
        />
      </form>
      <div className='list flex items-center space-x-4'>
        <Link to="/"><li className='hover:text-gray-400'>Home</li></Link>
        <div className="relative">
          <select
            onChange={navigateCategory}
            className="text-white bg-gray-800 border border-gray-600 px-4 py-2 rounded-lg shadow-lg appearance-none focus:outline-none focus:ring-2"
          >
            <option value="all">All categories</option>
            {categories && categories.map((category, index) => (
              <option className='bg-white text-black' key={index} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        {user ? (
          <>
            <Link to="/dashboard"><li className='hover:text-gray-400'>Dashboard</li></Link>
            <button onClick={logout} className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600'>Logout</button>
          </>
        ) : (
          <>
            <Link to="/register"><li className='hover:text-gray-400'>Register</li></Link>
            <Link to="/login"><li className='hover:text-gray-400'>Login</li></Link>
          </>
        )}
        <Link to="/cart"><li className='hover:text-gray-400'>Cart</li></Link>
      </div>
    </div>
  );
  
}

export default Header
