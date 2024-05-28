import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../services/api'
import {cartOperations, useCart} from '../context/cart'
import {toast} from 'react-toastify'
const ProductDetails = () => {
  const [product, setProduct] = useState()
  const context = useCart()
  const { slug } = useParams()
  useEffect(()=>{
    async function getProduct(){
      try{
        const {data} = await API.get(`products/${slug}`)
        setProduct(data.product)
      }catch({response}){
        console.log(response?.data.message);
      }
    }
    getProduct()
  },[])
  return (
    <div className='grid grid-cols-1 md:grid-cols-6 gap-8 p-8 bg-gray-900 text-white'>
      <div className="image col-span-2 flex justify-center items-center">
        <img src="https://via.placeholder.com/150"  alt={product && product.name} className="max-w-full rounded-lg shadow-lg" />
      </div>
      <div className="col-span-4">
        <h2 className="text-4xl font-bold mb-4">{product && product.name}</h2>
        <h3 className="text-2xl font-semibold mb-4">${product && product.price}</h3>
        <p className="text-lg mb-8">{product && product.description}</p>
        <div className="button-container flex gap-4">
          <button className='py-2 px-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition duration-300'>Buy Now</button>
          <button 
            className='py-2 px-4 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition duration-300'
            onClick={() => {
              cartOperations.addToCart(
                { _id: product._id, name: product.name, price: product.price, shortdesc: product.shortdesc },
                context
              );
              toast.success('Added to cart');
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails
