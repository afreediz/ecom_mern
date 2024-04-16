import { Route, Routes} from 'react-router-dom'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import ForgetPassword from './pages/Auth/ForgetPassword'
import Private from './components/Routes/Private'
import Layout from './components/Layout'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import ProductDetails from './pages/ProductDetails'
import Profile from './pages/Profile'
import AdminPrivate from './components/Routes/AdminPrivate'
import Dashboard from './pages/Admin/Dashboard'
import AllOrders from './pages/Admin/AllOrders'
import AllUsers from './pages/Admin/AllUsers'
import CreateCategory from './pages/Admin/CreateCategory'
import CreateProduct from './pages/Admin/CreateProduct'
import UserDashboard from './pages/Dashboard'
import {ToastContainer, toast} from 'react-toastify'
import { userContext } from './context/user'
import { useContext, useEffect, useState } from 'react'
import { api_url } from './datas'
import axios from 'axios'
import AdminLayout from './components/AdminLayout'

const App = () => {
  const [loading, setLoading] = useState(true)
  const {user, setUser} = useContext(userContext);
  useEffect(()=>{
    async function checkAuth(){
      try{
        const {data} = await axios.get(api_url+'user/get-user',{
          headers:{
            "Authorization":localStorage.getItem('token')
          }
        })
        setUser(data.user)
        setLoading(false)
      }catch({response}){
        setLoading(false)
        console.log(response);
      }   
    }
    checkAuth()
  },[])
  return (
    <div className="">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />}/>
          <Route path='register' element={<Register />}/>
          <Route path='forget-password' element={<ForgetPassword />}/>
          <Route path='products/:slug' element={<ProductDetails />} />
          <Route path='category/:slug' element={<Home />} />
          <Route path='cart' element={<Cart />} />
          {user && <>
            <Route path='dashboard' element={<UserDashboard />} />
            <Route path='profile' element={<Profile />} />
            <Route path='orders' element={<Orders />} />
            </>
          }
        </Route>
        {user && user.role == 'admin'?
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='create-category' element={<CreateCategory />} />
          <Route path='create-product' element={<CreateProduct />} />
          <Route path='products' element={<Home />} />
          <Route path='orders' element={<AllOrders />} />
          <Route path='users' element={<AllUsers />} />
        </Route>:<></>
        }
        <Route path='*' element={<div className=''>Not found</div>} />
      </Routes>
      <ToastContainer position='bottom-center' />
      {loading && <div className="laoder absolute top-0 right-0 left-0 bottom-0 bg-white flex justify-center items-center">Loading...</div>}
    </div>
  )
}

export default App