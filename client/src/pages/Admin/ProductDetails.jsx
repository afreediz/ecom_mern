import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../services/api'
import {toast} from 'react-toastify'
const AdminProductDetails = () => {
  const [product, setProduct] = useState()
  const { slug } = useParams()
  useEffect(()=>{
    async function getProduct(){
      try{
        const {data} = await API.get(`products/${slug}`)
        console.log(data);
        setProduct(data.product)
      }catch({response}){
        console.log(response?.data.message);
      }
    }
    getProduct()
  },[])
  return (
    <div className='grid grid-cols-1 md:grid-cols-6 gap-8 p-8 bg-gray-900 text-white'>
      <div className="image col-span-2 flex justify-center items-center relative">
        <div className=" absolute w-full h-full bg-transparent opacity-0 hover:bg-black hover:opacity-60 z-10 transition-all flex justify-center items-center hover:backdrop-blur-lg">
            <div className="outline outline-1 outline-white p-4">choose an image</div>
        </div>
        <img src="https://via.placeholder.com/150"  alt={product && product.name} className="max-w-full rounded-lg shadow-lg" />
      </div>
      <div className="col-span-4">
        <input value={product && product.name} className=" bg-transparent border-none outline-none text-4xl font-bold mb-4" />
        <input value={`$${product && product.price}`} className="bg-transparent border-none outline-none text-2xl font-semibold mb-4"/>
        <textarea value={product && product.description} className="  border-none outline-none w-full text-lg mb-8 bg-transparent" />
        <div className="button-container flex gap-4">
          <button className='py-2 px-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition duration-300'>Update </button>
        </div>
      </div>
    </div>
  );
}

export default AdminProductDetails