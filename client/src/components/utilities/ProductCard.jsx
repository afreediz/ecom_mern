import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useCart, cartOperations } from '../../context/cart'
import {toast} from 'react-toastify'
import ProductImage from './productimage.webp'
const ProductCard = ({data}) => {
  const context = useCart()
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <div className="image">
        <img src={ProductImage} alt={data.name} className="w-full h-48 object-cover" />
      </div>
      <div className="p-4">
        <div className="title">
          <h3 className="text-lg font-semibold text-gray-800">{data.name}</h3>
          <p className="text-gray-600">${data.price}</p>
        </div>
        <p className="text-gray-600 mt-2">{data.shortdesc}</p>
        <div className="buttons flex mt-4">
          <Link to={`/products/${data.slug}`} className="w-1/2 text-center py-2 bg-green-600 text-white rounded-l-lg hover:bg-green-700">More details</Link>
          <button onClick={() => {
            cartOperations.addToCart(data, context);
            toast.success('Added to cart');
          }} className="w-1/2 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard
