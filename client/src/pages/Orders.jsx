import React from 'react'
import OrdersCard from '../components/utilities/OrdersCard'

const Orders = () => {
  return (
    <div>
      <h1>Your Orders : </h1>
      <div className="p-4">
        <OrdersCard />
        <OrdersCard />
      </div>
    </div>
  )
}

export default Orders
