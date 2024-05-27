import React, { useEffect, useState } from 'react'
import SidebarLayout from '../components/user/SidebarLayout'
import axios from 'axios'
import { api_url } from '../datas'
import { toast } from 'react-toastify'
import API from '../services/api'

const Profile = () => {
  const [data, setData] = useState()
  const [updated, setUpdated] = useState(false)
  useEffect(()=>{
    async function getData(){
      try{
        const response = await API.get(api_url+'user/profile',{
          headers:{
            "Authorization":localStorage.getItem("token")
          }
        })
        setData(response.data.user)
      }catch({response}){
        console.log(response?.data.error)
      }
    }
    getData()
  },[])
  const onsubmit = async(e) => {
    e.preventDefault()
    try{
      const response = await API.put('user/profile', {
        ...data
      })
      toast.success(response?.data.message)
      setUpdated(false)
    }catch(error){
      throw error
    }
  }
  const onchange = (e) => {
    setUpdated(true)
    const {name, value} = e.target;
    setData((old_data)=>{
      return {
        ...old_data,
        [name]:value
      }
    })
  }
  return (
    <SidebarLayout className=' text-2xl'>
      <form onSubmit={onsubmit}>
        <div className=" my-2">
          <label className='block' htmlFor="name">Name</label>
          <input name='name' onChange={onchange} type="text" id='name' value={data && data.name } placeholder='Enter your name' />
        </div>
        <div className=" my-2">
          <label className="block" htmlFor="email">Email</label>
          <input name='email' onChange={onchange} type="text" id="email" value={data && data.email} placeholder='Enter your email' />
        </div>
        <div className=" my-2">
          <label className="block" htmlFor="phone">Phone</label>
          <input name='phone' onChange={onchange} type="text" id="phone" value={data && data.phone} placeholder='Enter your Phone' />
        </div>
        <div className=" my-2">
          <label className="block" htmlFor="address">Address</label>
          <input name='address' onChange={onchange} type="text" id="address" value={data && data.address} placeholder='Enter your Address' />
        </div>
        <button type='submit' disabled={!updated} className={`py-2 px-5 ${updated?"bg-green-600":"bg-gray-300"} text-white font-medium`} >Update</button>
      </form>
    </SidebarLayout>
  )
}

export default Profile
