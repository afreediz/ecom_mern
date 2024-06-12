import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../../context/user'
import { FaBars, FaTimes, FaShoppingCart, FaCat } from 'react-icons/fa';
import { cartContext } from '../../context/cart'
import API from '../../services/api'

const Header = () => {
  const {user, setUser} = useContext(userContext)
  const {cart} = useContext(cartContext);
  const [categories, setCategories] = useState()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [menuOpen, setMenuOpen] = useState(false);
  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/login')
  }
  useEffect(()=>{
    async function getCategory(){
      try{
        const {data} = await API.get('/category')
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
      <div className="font-bold logo text-4xl flex items-center">
        <Link to="/">ECOM</Link>
      </div>
      <form className="search flex-grow mx-4 hidden sm:flex" onSubmit={(e) => {
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
      <div className='list flex items-center space-x-4 sm:flex'>
        <Link to="/"><li className=' hidden lg:block hover:text-gray-400'>Home</li></Link>
        <div className="max-sm:hidden lg:relative ">
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
            <Link to="/profile"><li className=' hidden lg:block hover:text-gray-400'>Dashboard</li></Link>
            <button onClick={logout} className=' hidden lg:block px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600'>Logout</button>
          </>
        ) : (
          <>
            <Link to="/register"><li className='hover:text-gray-400'>Register</li></Link>
            <Link to="/login"><li className='hover:text-gray-400'>Login</li></Link>
          </>
        )}
        <Link to="/cart">
          <div className='flex items-center space-x-1 hover:text-gray-400'>
            <FaShoppingCart />
            <li className=' hidden lg:block'>Cart</li>
          </div>
        </Link>
        <FaBars className="lg:hidden text-2xl cursor-pointer" onClick={() => setMenuOpen(true)} />
      </div>
      {menuOpen && (
        <div className="fixed inset-0 bg-white text-black z-50 flex flex-col items-center p-4">
          <div className="self-end mb-4">
            <FaTimes className="text-2xl cursor-pointer" onClick={() => setMenuOpen(false)} />
          </div>
          <Link to="/" onClick={() => setMenuOpen(false)} className='hover:text-gray-400 mb-4'>Home</Link>
          <div className="relative mb-4">
            <select
              onChange={(e) => {
                navigateCategory(e);
                setMenuOpen(false);
              }}
              className=" text-black bg-white border border-gray-600 px-4 py-2 rounded-lg shadow-lg appearance-none focus:outline-none focus:ring-2 "
            >
              <option value="all">All categories</option>
              {categories && categories.map((category, index) => (
                <option key={index} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          {user ? (
            <>
              <Link to="/profile" onClick={() => setMenuOpen(false)} className='hover:text-gray-400 mb-4'>Dashboard</Link>
              <button onClick={() => {
                logout();
                setMenuOpen(false);
              }} className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 mb-4'>Logout</button>
            </>
          ) : (
            <>
              <Link to="/register" onClick={() => setMenuOpen(false)} className='hover:text-gray-400 mb-4'>Register</Link>
              <Link to="/login" onClick={() => setMenuOpen(false)} className='hover:text-gray-400 mb-4'>Login</Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Header
