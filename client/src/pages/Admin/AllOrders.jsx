import React, { useState, useEffect } from 'react';
import API, { format_date }  from '../../services/api';
import {toast} from 'react-toastify'
const AllOrders = () => {
  const [orders, setOrders] = useState()

  useEffect(()=>{
    async function getOrders(){
      try{
        const res = await API.get("orders/all")
        console.log(res);
        setOrders(res.data.orders)
      }catch({response}){
        console.log(response?.data.message)
      }
    }
    getOrders()
  },[])
  console.log("orders ", orders);

  const handleShippingStatusChange = async(orderId, newStatus) => {
    if (newStatus == "Delete"){
      try{
        await API.delete(`orders/${orderId}`)
        setOrders((prev)=>{
          return prev.filter((order)=>order._id !== orderId)
        })
        return toast.success("Order deleted successfully")
      }catch({response}){
        console.log(response?.data.message)
      }
    }else{
      try{
        await API.put(`orders/${orderId}`, {status: newStatus})
        setOrders((prev)=>{
          return prev.map((order)=>order._id === orderId ? {...order, status: newStatus} : order)
        })
        toast.success("Shipping status updated successfully")
      }catch({response}){
        console.log(response?.data.message)
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Orders</h1>
      <table className="min-w-full bg-gray-800 text-white divide-y divide-gray-600">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Index</th>
            <th className=" max-md:hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Order ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Products</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Payment Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Shipping Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-600">
          {orders && orders.map((order, index)=>{
            return (
              <tr key={order.orderid}>
              <td className="px-6 py-4 whitespace-nowrap">{index+1}</td>
              <td className=" max-md:hidden px-6 py-4 whitespace-nowrap">{order._id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{
                order.products.map((ordered_product_details)=>{
                  return <div className="">
                    <div className='bg-gray-900 p-2 rounded my-1'>{ordered_product_details.product ? ordered_product_details.product.name : "Product no longer available"} - {ordered_product_details.cart_quantity}</div>
                  </div>
                })
              }</td>
              <td className="px-6 py-4 whitespace-nowrap">{format_date(order.createdAt)}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.payment}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={order.shippingStatus}
                  onChange={(e) => handleShippingStatusChange(order._id, e.target.value)}
                  className="block w-full py-2 px-4 border border-gray-300 bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="Shipped">{order.status}</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Canceled">Cancelled</option>
                  <option value="Delete">Delete</option>
                </select>
              </td>
            </tr>)}
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllOrders;
