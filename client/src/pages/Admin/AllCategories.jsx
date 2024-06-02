import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import CreateCategory from './CreateCategory';
import { toast } from 'react-toastify';

const AllCategories = () => {
  // Fake categories data
  const [displayAdd, setDisplayAdd] = useState(false)
  const [categories, setCategories] = useState()
  useEffect(()=>{
    async function getCategory(){
      try{
        const res = await API.get("/category")
        console.log(res);
        setCategories(res.data.categories)
      }catch({response}){
        console.log(response?.data.message)
      }
    }
    getCategory()
  },[])
  async function hanldeUpdate(e, id){
    e.preventDefault()
    
    try{
      const res = await API.put(`/category/${id}`, {
        name: e.target.name.value
      })
      console.log(res);
    }catch({response}){
      console.log(response?.data.message)
    }
  }
  return (
    <div className='relative'>
      <h1 className="text-3xl font-semibold mb-4">Categories</h1>
      <div className="flex justify-end px-8 my-2">
        <button onClick={()=>setDisplayAdd(!displayAdd)} className="py-3 px-6 bg-green-600 text-white font-bold rounded">Add Category</button>
      </div>
      <table className="min-w-full bg-gray-800 text-white divide-y divide-gray-200 shadow-md rounded-lg overflow-hidden">
        <thead className="">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Index
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {/* Map through categories data */}
          {categories && categories.map((category, index) => (
            <tr key={index} className="">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{index}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm ">{category._id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm ">
                <form action="" onSubmit={async(e)=>{
                  e.preventDefault()
                    try{
                      const res = await API.put(`/category/${category._id}`, {
                        name: category.name
                      })
                      toast.success("Category updated successfully")
                    }catch({response}){
                      console.log(response?.data.message)
                    }
                }}>
                  <input className=' bg-transparent border-none outline-none' type="text" value={category.name} onChange={(e)=>{
                    setCategories((prev)=>{
                      return prev.map((item)=>{
                        if(item._id == category._id){
                          return {...item, name: e.target.value}
                        }else{
                          return item
                        }
                      })
                    })
                  }} />
                </form>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="">
        {displayAdd && <CreateCategory setCategories={setCategories} setDisplayAdd={setDisplayAdd} />}
      </div>
    </div>
  );
}

export default AllCategories;
