import React, { useState } from 'react';

const AllOrders = () => {
  // Sample orders data (replace with actual data from your backend)
  const [orders, setOrders] = useState([
    { index: 1, orderid: 'ORD001', user: 'John Doe', product: 'Product A', quantity: 2, paymentStatus: 'Paid', shippingStatus: 'Shipped' },
    { index: 2, orderid: 'ORD002', user: 'Jane Smith', product: 'Product B', quantity: 1, paymentStatus: 'Pending', shippingStatus: 'Pending' },
    // Add more orders as needed
  ]);

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
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Product</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Quantity</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Payment Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Shipping Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-600">
          {orders.map(order => (
            <tr key={order.orderid}>
              <td className="px-6 py-4 whitespace-nowrap">{order.index}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.orderid}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.user}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.product}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.quantity}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.paymentStatus}</td>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllOrders;
