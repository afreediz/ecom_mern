import { Route, Routes} from 'react-router-dom'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import ForgetPassword from './pages/Auth/ForgetPassword'
import Layout from './components/Layout'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import ProductDetails from './pages/ProductDetails'
import Profile from './pages/Profile'
import Dashboard from './pages/Admin/Dashboard'
import AllOrders from './pages/Admin/AllOrders'
import AllUsers from './pages/Admin/AllUsers'
import CreateCategory from './pages/Admin/CreateCategory'
import CreateProduct from './pages/Admin/CreateProduct'
import {ToastContainer, toast} from 'react-toastify'
import { userContext } from './context/user'
import { useContext, useEffect, useState } from 'react'
import AdminLayout from './components/AdminLayout'
import API from './services/api'
import CategoryProducts from './pages/CategoryProducts'
import SearchProducts from './pages/SearchProducts'
import AllProducts from './pages/Admin/AllProducts'
import AllCategories from './pages/Admin/AllCategories'
import AdminProductDetails from './pages/Admin/ProductDetails'

const App = () => {
  const [loading, setLoading] = useState(true)
  const {user, setUser} = useContext(userContext);
  useEffect(()=>{
    async function checkAuth(){
      try{
        const {data} = await API.get('users/get-user')
        setUser(data.user)
        setLoading(false)
      }catch(error){
        setLoading(false)
        toast.error(error.response.data.message)
        console.log(error);
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
          <Route path='category/:slug' element={<CategoryProducts />} />
          <Route path='search/:query' element={<SearchProducts />} />
          <Route path='cart' element={<Cart />} />
          {user && <>
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
          <Route path='products' element={<AllProducts />} />
          <Route path='products/:slug' element={<AdminProductDetails />} />
          <Route path='orders' element={<AllOrders />} />
          <Route path='users' element={<AllUsers />} />
          <Route path='categories' element={<AllCategories />} />
        </Route>:<>Sorry, You dont have access to this page.</>
        }
        <Route path='*' element={<div className=''>Not found</div>} />
      </Routes>
      <ToastContainer position='bottom-center' />
      {loading && <div className="laoder absolute top-0 right-0 left-0 bottom-0 bg-white flex justify-center items-center">Loading...</div>}
    </div>
  )
}

export default App