import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../../services/api'
import {toast} from 'react-toastify'
import slugify from 'slugify'

const AdminProductDetails = () => {
    const [product, setProduct] = useState()
    const [categories, setCategories] = useState([])
    const [updateable, setUpdateable] = useState(false)
    const [image, setImage] = useState(null);
    const [old_image, setOldImage] = useState(null);
    const navigate = useNavigate()
    
    const { slug } = useParams()
    useEffect(()=>{
        async function getProduct(){
      try{
        const {data} = await API.get(`products/${slug}`)
        setImage(data.product.image)
        setOldImage(data.product.image)
        console.log(data);
        const {_id, category, name, price, shortdesc, description, quantity} = data.product
        setProduct({_id, category, name, price, shortdesc, description, quantity})
        console.log('here ',data.product);
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

  const onChange = (e) => {
    setUpdateable(true)
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    })
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
    e.preventDefault()
    try{
      const {data} = await API.put(`products/${product._id}`, {
        ...product, image, old_image
      })
      navigate(`/admin/products/${slugify(product.name)}`)
      console.log(data);
      setUpdateable(false)
      toast.success(data.message)
    }catch({response}){
      console.log(response?.data.message);
    }
  }
  const handleFileChange = (e) => {
    setUpdateable(true)
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  
  console.log(product);
  return (
    <div className='grid grid-cols-1 md:grid-cols-6 gap-8 p-8 bg-gray-900 text-white w-screen'>
      <div className="image w-full md:col-span-2 flex justify-center items-center relative">
        <div className=" absolute w-full h-full bg-transparent opacity-0 hover:bg-black hover:opacity-60 z-10 transition-all flex justify-center items-center hover:backdrop-blur-lg">
            {/* <input type='file' onChange={handleFileChange} className="outline border-none outline-1 outline-white p-4 hover:outline-red-900 hover:text-red-900 bg-transparent text-white text-center" placeholder='choose an image' /> */}
            <input
          type="file"
          id="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }} // Hide the actual input element
        />
        <label htmlFor="file" className="custom-file-upload">
          <div className="outline border-none outline-1 outline-white p-4 hover:outline-red-500 hover:text-red-500 bg-transparent text-white text-center">
            choose an image
          </div>
        </label>
        </div>
        <img src={product && image ? image :"https://via.placeholder.com/150"}  alt={product && product.name} className="max-w-full rounded-lg shadow-lg" />
      </div>
      <div className="md:col-span-4 w-full">
        <input onChange={(e)=>(
          onChange(e)

        )} name="name" value={product && product.name} className=" bg-transparent border-none outline-none text-4xl font-bold mb-4" />
        <div className=" flex items-center text-2xl font-semibold mb-4">$<input onChange={onChange} name="price" type='number' value={`${product && product.price}`} className="bg-transparent border-none outline-none"/></div>
        <div className=" flex items-center mb-4">
        <span>quantity</span>
        <input onChange={onChange} name="quantity" value={product && product.quantity} className="  border-none outline-none w-full mt-2 bg-transparent"/>
        </div>
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