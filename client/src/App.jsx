import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
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

const App = () => {
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
          <Route path='dashboard' element={<Private />} >
            <Route path='orders' element={<Orders />} />
            <Route path='profile' element={<Profile />} />
          </Route>
        </Route>
        <Route path='/admin' element={<AdminPrivate />}>
          <Route index element={<Dashboard />} />
          <Route path='create-category' element={<CreateCategory />} />
          <Route path='create-product' element={<CreateProduct />} />
          <Route path='products' element={<Home />} />
          <Route path='orders' element={<AllOrders />} />
          <Route path='users' element={<AllUsers />} />
        </Route>
        <Route path='*' element={<div className=''>Not found</div>} />
      </Routes>
    </div>
  )
}

export default App