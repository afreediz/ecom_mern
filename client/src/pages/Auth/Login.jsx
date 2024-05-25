import axios from 'axios';
import React, { useState } from 'react'
import { api_url } from '../../datas';
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

const Login = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email:"",
    password:""
  })
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
      const response = await axios.post(api_url+'auth/login',{
        ...data
      })
      toast.success("User Login successfull")
      localStorage.setItem('token',response.data.token)
      navigate('/')
      window.location.reload()
    }catch(error){
      toast.error(error.response.data.message)
    }
  }
  return (
    <div className='mx-auto w-1/3 border-2 border-slate-500'>
      <h1 className='flex justify-center font-medium'>Login form</h1>
      <div className="inputs p-4">
        <form onSubmit={login}>
          <input type="text" className='w-full' placeholder='Email' name='email' value={data.email} onChange={onchange} />
          <input type="password" className='w-full' placeholder='Password' name='password' value={data.password} onChange={onchange} />
          <button className='w-full py-2 bg-green-600 text-white font-normal'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
