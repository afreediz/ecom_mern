import React, { useEffect, useState } from 'react'
import OrdersCard from '../components/utilities/OrdersCard'
import SidebarLayout from '../components/user/SidebarLayout'
import { api_url } from '../datas'
import API from '../services/api'
import { toast } from 'react-toastify'

const Orders = () => {
  const [orders, setOrders] = useState()
  useEffect(()=>{
    async function getOrders(){
      try{
        const {data} = await API.get(api_url+"products/test-getorder")
        setOrders(data.orders)
      }catch({response}){
        toast.error(response.data.message)
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
      <h1>Your Orders : </h1>
      <div className="table w-full p-4">
        <table className='w-full border-2 border-black sketc'>
            <thead>
              <tr>
                <th className=' border border-black'>index</th>
                <th className=' border border-black'>order id</th>
                <th className=' border border-black'>date</th>
                <th className=' border border-black'>payment</th>
                <th className=' border border-black'>status</th>
              </tr>
            </thead>
            <tbody>
              { orders && orders.map((order, index)=>{
                return <tr className=' border-b-2 border-slate-500' key={index}>
                 <td className=' border-r border-black'>{index}</td>
                 <td className=' border-r border-black'>{order._id}</td>
                 <td className=' border-r border-black'>{format_date(order.createdAt)}</td>
                 <td className=' border-r border-black'>{order.payment}</td>
                 <td className=' border-r border-black'>{order.status}</td>
                </tr>
              })

              }
            </tbody>
        </table>
      </div>
      <div className="p-4">
        {orders && orders.map((order, index)=>{
          return order.products.map((product_data, index)=>{
            return <OrdersCard product={product_data.product} quantity={product_data.cart_quantity} order_id={order._id} order_date={format_date(order.createdAt)} key={index} />
          })
        })}
      </div>
    </SidebarLayout>
  )
}

export default Orders
