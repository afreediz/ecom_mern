import React from 'react'

const OrdersCard = () => {
  return (
    <div className='w-full border-2 border-slate-400 p-4 my-4'>
      <div className="table"></div>
      <div className="product grid grid-cols-3">
        <div className=" col-span-1">
            <img src="" alt="" />
        </div>
        <div className=" col-span-2">
            <h2>Title</h2>
            <h2>Desc</h2>
            <h2>Price</h2>
        </div>
      </div>
    </div>
  )
}

export default OrdersCard
