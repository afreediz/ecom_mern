import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../../services/api'
import {toast} from 'react-toastify'
const AdminProductDetails = () => {
    const [product, setProduct] = useState()
    const [choosenCategory, setChoosenCategory] = useState()
    const [categories, setCategories] = useState([])
    const [updateable, setUpdateable] = useState(false)
    const navigate = useNavigate()
    
    const { slug } = useParams()
    useEffect(()=>{
        async function getProduct(){
      try{
        const {data} = await API.get(`products/${slug}`)
        setChoosenCategory(data.product.category._id)
        console.log(data);
        setProduct(data.product)
      }catch({response}){
        console.log(response?.data.message);
      }
    }
    const getCategories = async () => {
        try {
            const { data } = await API.get('/category')
            setCategories(data.categories)
        } catch ({ response }) {
            console.log(response?.data.message)
        }
    }
    getProduct()
    getCategories()
  },[])
  console.log(choosenCategory);

  const onChange = (e) => {
    setUpdateable(true)
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    })
  }
  const onCategoryChange = (e) => {
    setUpdateable(true)
    setChoosenCategory(e.target.value)
  }

  const handleDelete = async () => {
    try{
      const {data} = await API.delete(`products/${product._id}`)
      console.log(data);
      navigate('/admin/products')
      toast.success(data.message)
    }catch({response}){
      console.log(response?.data.message);
    }
  }

  const handleUpdate = async (e) => {
    console.log({
        category:choosenCategory,
        ...product
    });
    e.preventDefault()
    try{
      const {data} = await API.put(`products/${product._id}`, {
        ...product
      })
      console.log(data);
      setUpdateable(false)
      toast.success(data.message)
    }catch({response}){
      console.log(response?.data.message);
    }
  }
  
  console.log(product);
  return (
    <div className='grid grid-cols-1 md:grid-cols-6 gap-8 p-8 bg-gray-900 text-white w-screen'>
      <div className="image w-full md:col-span-2 flex justify-center items-center relative">
        <div className=" absolute w-full h-full bg-transparent opacity-0 hover:bg-black hover:opacity-60 z-10 transition-all flex justify-center items-center hover:backdrop-blur-lg">
            <div className="outline outline-1 outline-white p-4 hover:outline-red-900 hover:text-red-900">choose an image</div>
        </div>
        <img src="https://via.placeholder.com/150"  alt={product && product.name} className="max-w-full rounded-lg shadow-lg" />
      </div>
      <div className="md:col-span-4 w-full">
        <input onChange={onChange} name="name" value={product && product.name} className=" bg-transparent border-none outline-none text-4xl font-bold mb-4" />
        <div className=" flex items-center text-2xl font-semibold mb-4">$<input onChange={onChange} name="price" type='number' value={`${product && product.price}`} className="bg-transparent border-none outline-none"/></div>
        <input onChange={onChange} name="shortdesc" value={product && product.shortdesc} className="  border-none outline-none w-full text-lg mb-8 bg-transparent"/>
        <textarea onChange={onChange} name="description" value={product && product.description} className="  border-none outline-none w-full text-lg mb-8 bg-transparent" />
        <select onChange={onChange} name="category" value={product && product.category._id} className="border-none outline-none w-full text-lg mb-8 bg-transparent">
          <option className=' bg-gray-900 p-2 text-white' value={product && product.category._id}> { product && product.category.name}</option>
          {categories && categories.map((category) => (
            <option  className=' bg-gray-900 p-2 text-white' key={category.name} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <div className="button-container flex gap-4">
          <button onClick={handleUpdate} disabled={!updateable} className={`py-2 px-4 ${updateable ? 'bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition duration-300' : 'bg-gray-500 text-white cursor-not-allowed font-medium rounded-lg'}`}>Update </button>
          <button onClick={handleDelete} className='py-2 px-4 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition duration-300'>Delete </button>
        </div>
      </div>
    </div>
  );
}

export default AdminProductDetails