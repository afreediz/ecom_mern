import React, { useContext, useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import {userContext} from '../../context/user'
import API from '../../services/api'

const Register = () => {
  const {user} = useContext(userContext)
  const navigate = useNavigate()
  const [data, setData] = useState({
    name:"",
    email:"",
    password:"",
    phone:"",
    address:""
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
      return{
        ...old_data,
        [name]:value
      }
    })
  }
  const register = async(e)=> {
    e.preventDefault()
    try{
      await API.post('auth/register',{...data})
      toast.success("User Registration successfull")
      navigate('/login')
    }catch(error){
      toast.error(error.response?.data.message)
      console.log(error)
      // throw error;
    }
  }
  return (
<div className='flex justify-center items-center bg-gray-100'>
      <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-md'>
        <h1 className='text-3xl font-semibold text-center text-gray-700 mb-6'>Register Form</h1>
        <form onSubmit={register}>
          <div className='mb-4'>
            <input 
              type="text" 
              name='name' 
              minLength={3}
              value={data.name} 
              onChange={onchange} 
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' 
              placeholder='Name' 
            />
          </div>
          <div className='mb-4'>
            <input 
              type="email" 
              name='email' 
              value={data.email} 
              onChange={onchange} 
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' 
              placeholder='Email' 
            />
          </div>
          <div className='mb-4'>
            <input 
              type="password" 
              name='password' 
              minLength={8}
              value={data.password} 
              onChange={onchange} 
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' 
              placeholder='Password' 
            />
          </div>
          <div className='mb-4'>
            <input 
              type="number" 
              name='phone' 
              minLength={10}
              value={data.phone} 
              onChange={onchange} 
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' 
              placeholder='Phone' 
            />
          </div>
          <div className='mb-6'>
            <input 
              type="text" 
              name='address' 
              value={data.address} 
              onChange={onchange} 
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' 
              placeholder='Address' 
            />
          </div>
          <button 
            type='submit' 
            className='w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors'
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
