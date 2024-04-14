import React from 'react'

const Profile = () => {
  return (
    <div className=' text-2xl'>
      <div className=" my-2">
        <label className='block' htmlFor="name">Name</label>
        <input type="text" id='name' value="afreedi" placeholder='Enter your name' />
      </div>
      <div className=" my-2">
        <label className="block" htmlFor="email">Email</label>
        <input type="text" id="email" value="afreedi@gmail.com" placeholder='Enter your email' />
      </div>
      <div className=" my-2">
        <label className="block" htmlFor="phone">Phone</label>
        <input type="text" id="phone" value="9090909090" placeholder='Enter your Phone' />
      </div>
      <div className=" my-2">
        <label className="block" htmlFor="address">Address</label>
        <input type="text" id="address" value="5/1 house" placeholder='Enter your Address' />
      </div>
      <button className='py-2 px-5 bg-green-600 text-white font-medium'>Update</button>
    </div>
  )
}

export default Profile
