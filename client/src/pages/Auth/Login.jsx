import axios from 'axios';
import React, { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { userContext } from '../../context/user';
import API from '../../services/api';

const Login = () => {
  const navigate = useNavigate()
  const {user, setUser} = useContext(userContext)
  const [data, setData] = useState({
    email:"",
    password:""
  })
  if(user){
    if(user.role == "admin"){
      return navigate('/admin')
    }else{
      return navigate('/')
    }
  }
  const onchange = (e) => {
    const {name, value} = e.target;
    setData((old_data)=>{
      return {
        ...old_data,
        [name]:value
      }
    })
  }
  const login = async(e) => {
    e.preventDefault();
    try{
      const response = await API.post('auth/login',{
        ...data
      })
      console.log(response);
      setUser(response.data.user)
      toast.success("User Login successfull")
      localStorage.setItem('token',response.data.token)
      if(response.data.user.role == 'admin'){
        navigate('/admin')
      }else{
        navigate('/')
      }
    }catch(error){
      toast.error(error.response?.data.message)
      console.log(error)
    }
  }
  return (
<div className='flex justify-center items-center bg-gray-100'>
      <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-md'>
        <h1 className='text-3xl font-semibold text-center text-gray-700 mb-6'>Login Form</h1>
        <form onSubmit={login}>
          <div className='mb-4'>
            <input 
              type="email" 
              name='email' 
              required 
              value={data.email} 
              onChange={onchange} 
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' 
              placeholder='Email' 
            />
          </div>
          <div className='mb-6'>
            <input 
              type="password" 
              name='password' 
              required 
              minLength={8}
              value={data.password} 
              onChange={onchange} 
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' 
              placeholder='Password' 
            />
          </div>
          <button 
            type='submit' 
            className='w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
