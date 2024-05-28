import React, { useState, useEffect } from 'react';
import API from '../../services/api';

const AllOrders = () => {
  // // Sample orders data (replace with actual data from your backend)
  // const [orders, setOrders] = useState([
  //   { index: 1, orderid: 'ORD001', user: 'John Doe', product: 'Product A', quantity: 2, paymentStatus: 'Paid', shippingStatus: 'Shipped' },
  //   { index: 2, orderid: 'ORD002', user: 'Jane Smith', product: 'Product B', quantity: 1, paymentStatus: 'Pending', shippingStatus: 'Pending' },
  //   // Add more orders as needed
  // ]);

  const [orders, setOrders] = useState([])
  let index = 0;

  useEffect(()=>{
    async function getOrders(){
      try{
        const res = await API.get("products/get-all-orders")
        console.log(res);
        setOrders(res.data.orders)
      }catch({response}){
        console.log(response?.data.message)
      }
    }
    getOrders()
  },[])
  console.log("orders ", orders);
  const format_date = (date)=> {
    const day = new Date(date).getDate()
    const month = new Date(date).getMonth()
    const year = new Date(date).getFullYear()

    return `${day}/${month}/${year}`
  }

  // Function to handle updating shipping status
  const handleShippingStatusChange = (orderId, newStatus) => {
    // Update the orders state with the new shipping status
    const updatedOrders = orders.map(order => {
      if (order.orderid === orderId) {
        return { ...order, shippingStatus: newStatus };
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Orders</h1>
      <table className="min-w-full bg-gray-800 text-white divide-y divide-gray-600">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Index</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Order ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Products</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Payment Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Shipping Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-600">
          {orders.map((order)=>{
            // let products = ""
            // order.products.map(({product})=>{
            //   products = product.name + " "
            // })
            return (
              <tr key={order.orderid}>
              <td className="px-6 py-4 whitespace-nowrap">{index}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order._id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{
                order.products.map((ordered_product_details)=>{
                  return <div className="">
                    <div className='bg-gray-900 p-2 rounded my-1'>{ordered_product_details.product.name} - {ordered_product_details.cart_quantity}</div>
                  </div>
                })
              }</td>
              <td className="px-6 py-4 whitespace-nowrap">{format_date(order.createdAt)}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.payment}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={order.shippingStatus}
                  onChange={(e) => handleShippingStatusChange(order.orderid, e.target.value)}
                  className="block w-full py-2 px-4 border border-gray-300 bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="Shipped">Shipped</option>
                  <option value="Processing">Processing</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
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
