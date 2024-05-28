import React, { useEffect, useState } from 'react'
import OrdersCard from '../components/utilities/OrdersCard'
import SidebarLayout from '../components/user/SidebarLayout'
import API from '../services/api'
import { toast } from 'react-toastify'

const Orders = () => {
  const [orders, setOrders] = useState()
  useEffect(()=>{
    async function getOrders(){
      try{
        const {data} = await API.get("products/test-getorder")
        setOrders(data.orders)
      }catch({response}){
        console.log(response?.data.message)
      }
    }
    getOrders()
  },[])
  const format_date = (date)=> {
    const day = new Date(date).getDate()
    const month = new Date(date).getMonth()
    const year = new Date(date).getFullYear()

    return `${day}/${month}/${year}`
  }
  return (
    <SidebarLayout>
      <h1 className='text-4xl font-bold text-gray-800 mb-4'>Your Orders</h1>
      <div className="overflow-x-auto">
        <table className='w-full bg-white shadow-lg rounded-lg'>
          <thead>
            <tr className='bg-gray-200 text-gray-700'>
              <th className='py-2 px-4 border border-gray-300'>Index</th>
              <th className='py-2 px-4 border border-gray-300'>Order ID</th>
              <th className='py-2 px-4 border border-gray-300'>Date</th>
              <th className='py-2 px-4 border border-gray-300'>Payment</th>
              <th className='py-2 px-4 border border-gray-300'>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.map((order, index) => (
              <tr key={index} className='border-b border-gray-200'>
                <td className='py-2 px-4 border-r border-gray-300'>{index}</td>
                <td className='py-2 px-4 border-r border-gray-300'>{order._id}</td>
                <td className='py-2 px-4 border-r border-gray-300'>{format_date(order.createdAt)}</td>
                <td className='py-2 px-4 border-r border-gray-300'>{order.payment}</td>
                <td className='py-2 px-4 border-r border-gray-300'>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 space-y-4">
        {orders && orders.map((order, index) => (
          order.products.map((product_data, idx) => (
            <OrdersCard
              key={idx}
              product={product_data.product}
              quantity={product_data.cart_quantity}
              order_id={order._id}
              order_date={format_date(order.createdAt)}
            />
          ))
        ))}
        {orders && orders.length == 0 ?<div className='text-3xl text-center'>No Orders Found</div>:""}
      </div>
    </SidebarLayout>
  );
}

export default Orders
