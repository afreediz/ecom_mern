import React from 'react'

const OrdersCard = ({product, quantity, order_id, order_date}) => {
  return (
    <div className='w-full border border-gray-300 rounded-lg my-4 bg-white shadow-md'>
      <div className="product grid grid-cols-1 md:grid-cols-5 gap-4 p-4">
        <div className="col-span-1">
          {product ? <img src="https://via.placeholder.com/150" alt={product.name} className="w-full h-auto rounded-lg" /> : <img src={product.image ? product.image :"https://via.placeholder.com/150"} alt="product image" className="w-full h-auto rounded-lg" />}
        </div>
        <div className="col-span-4 space-y-2">
          <h2 className='text-lg font-semibold text-gray-700'>Order ID: <span className='text-gray-500'>{order_id}</span></h2>
          {product ? (
            <div className="">
              <h2 className='text-lg font-semibold text-gray-700'>Title: <span className='text-gray-500'>{product.name}</span></h2>
              <h2 className='text-lg font-semibold text-gray-700'>Description: <span className='text-gray-500'>{product.shortdesc}</span></h2>
              <h2 className='text-lg font-semibold text-gray-700'>Price: <span className='text-gray-500'>${product.price}</span></h2>
            </div>
          ): "Product no longer available"}
          <h2 className='text-lg font-semibold text-gray-700'>Quantity: <span className='text-gray-500'>{quantity}</span></h2>
          <h2 className='text-lg font-semibold text-gray-700'>Date: <span className='text-gray-500'>{order_date}</span></h2>
        </div>
      </div>
    </div>
  );
}

export default OrdersCard
