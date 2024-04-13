import React from 'react'

const Login = () => {
  return (
    <div className='mx-auto w-1/3 border-2 border-slate-500'>
      <h1 className='flex justify-center font-medium'>Login form</h1>
      <div className="inputs p-4">
        <input type="text" className='w-full border-b-2 border-slate-300 p-2 mb-2' placeholder='Email' />
        <input type="text" className='w-full border-b-2 border-slate-300 p-2 mb-2' placeholder='Password' />
        <button className='w-full py-2 bg-green-600 text-white font-normal'>Login</button>
      </div>
    </div>
  )
}

export default Login
