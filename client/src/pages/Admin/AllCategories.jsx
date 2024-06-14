import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import CreateCategory from './CreateCategory';
import { toast } from 'react-toastify';

const AllCategories = () => {
  const [displayAdd, setDisplayAdd] = useState(false)
  const [categories, setCategories] = useState()
  const navigate = useNavigate()
  useEffect(()=>{
    async function getCategory(){
      try{
        const res = await API.get("/category")
        setCategories(res.data.categories)
      }catch(error){
        toast.error(error.response?.data.message)
        console.log(error)
      }
    }
    getCategory()
  },[])

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
            <th scope="col" className=" max-md:hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
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
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{index+1}</td>
              <td className=" max-md:hidden px-6 py-4 whitespace-nowrap text-sm ">{category._id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm ">
                <form action="" onSubmit={async(e)=>{
                  e.preventDefault()
                    try{
                      await API.put(`/category/${category._id}`, {
                        name: category.name
                      })
                      toast.success("Category updated successfully")
                    }catch(error){
                      toast.error(error.response?.data.message)
                      console.log(error)
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
                <div className=" flex gap-2">
                <button className="text-blue-600 hover:text-blue-900" onClick={()=>{navigate('/category/'+category.slug)}}>view</button>
                <form action="" onSubmit={async(e)=>{
                  try{
                    e.preventDefault()
                    await API.delete(`/category/${category._id}`)
                    setCategories((prev)=>prev.filter((item)=>item._id != category._id))
                    toast.success("Category deleted successfully")
                  }catch(error){
                    toast.error(error.response?.data.message)
                    console.log(error)
                  }
                }}>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </form>
                </div>
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
