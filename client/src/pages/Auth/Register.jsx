import React, { useContext, useState } from 'react'
import axios from 'axios'
import { api_url } from '../../datas'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import {userContext} from '../../context/user'

const Register = () => {
  const {user} = useContext(userContext)
  console.log(user);
  const navigate = useNavigate()
  const [data, setData] = useState({
    name:"",
    email:"",
    password:"",
    phone:"",
    address:""
  })
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
      const response = await axios.post(api_url+'auth/register',{
        ...data
      })
      toast.success("User Registration successfull")
      navigate('/login')
    }catch({response}){
      toast.error(response.data.message)
      // throw error;
    }
  }
  return (
    <div className='mx-auto w-1/3 border-2 border-slate-500'>
      <h1 className='flex justify-center font-medium'>Register form</h1>
      <div className="inputs p-4">
        <form onSubmit={register}>
          <input type="text" value={data.name} name='name' onChange={onchange} className='w-full border-b-2 border-slate-300 p-2 mb-2' placeholder='Name' />
          <input type="text" value={data.email} name='email' onChange={onchange} className='w-full border-b-2 border-slate-300 p-2 mb-2' placeholder='Email' />
          <input type="text" value={data.password} name='password' onChange={onchange} className='w-full border-b-2 border-slate-300 p-2 mb-2' placeholder='Password' />
          <input type="text" value={data.phone} name='phone' onChange={onchange} className='w-full border-b-2 border-slate-300 p-2 mb-2' placeholder='Phone' />
          <input type="text" value={data.address} name='address' onChange={onchange} className='w-full border-b-2 border-slate-300 p-2 mb-2' placeholder='Address' />
          <button className='w-full py-2 bg-green-600 text-white font-normal'>Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register
