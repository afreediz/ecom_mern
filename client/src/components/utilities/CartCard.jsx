import React from 'react'
import { useCart, cartOperations } from '../../context/cart'
import {toast} from 'react-toastify'

const CartCard = ({product}) => {
  const context = useCart()
  return (
    <div className='grid grid-cols-5 m-8 p-4 gap-4 rounded-lg border border-gray-300 shadow-md'>
      {/* Image Section */}
      <div className="image sm:col-span-1 col-span-5">
        <img
          src={product.image ? product.image :"https://via.placeholder.com/150"}
          alt={product.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Body Section */}
      <div className="body col-span-4 flex flex-col justify-between">
        {/* Product Name */}
        <h2 className='text-3xl font-semibold'>{product.name}</h2>

        {/* Product Price */}
        <h2 className='text-2xl font-semibold'>${product.price}</h2>

        {/* Product Short Description */}
        <h3 className='text-lg'>{product.shortdesc}</h3>

        {/* Quantity Options */}
        <div className="options flex items-center gap-8 mt-4">
          {/* Decrease Quantity Button */}
          <button onClick={() => cartOperations.removeCart(product, context)} className='px-4 py-2 bg-red-600 text-white font-semibold rounded-lg'>
            -
          </button>

          {/* Quantity */}
          <span className="text-xl font-semibold">{product.cart_quantity}</span>

          {/* Increase Quantity Button */}
          <button onClick={() => cartOperations.addToCart(product, context)} className='px-4 py-2 bg-green-600 text-white font-semibold rounded-lg'>
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartCard
