import React, { useEffect, useState } from 'react'
import SidebarLayout from '../components/user/SidebarLayout'
import axios from 'axios'
import { api_url } from '../datas'
import { toast } from 'react-toastify'

const Profile = () => {
  const [data, setData] = useState()
  useEffect(()=>{
    async function getData(){
      try{
        const response = await axios.get(api_url+'user/profile',{
          headers:{
            "Authorization":localStorage.getItem("token")
          }
        })
        setData(response.data.user)
      }catch({response}){
        toast.error(response.data.error)
      }
    }
    getData()
  },[])
  return (
    <SidebarLayout className=' text-2xl'>
      <div className=" my-2">
        <label className='block' htmlFor="name">Name</label>
        <input type="text" id='name' value={data && data.name } placeholder='Enter your name' />
      </div>
      <div className=" my-2">
        <label className="block" htmlFor="email">Email</label>
        <input type="text" id="email" value={data && data.email} placeholder='Enter your email' />
      </div>
      <div className=" my-2">
        <label className="block" htmlFor="phone">Phone</label>
        <input type="text" id="phone" value={data && data.phone} placeholder='Enter your Phone' />
      </div>
      <div className=" my-2">
        <label className="block" htmlFor="address">Address</label>
        <input type="text" id="address" value={data && data.phone} placeholder='Enter your Address' />
      </div>
      <button className='py-2 px-5 bg-green-600 text-white font-medium'>Update</button>
    </SidebarLayout>
  )
}

export default Profile
