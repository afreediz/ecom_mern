import { useEffect, useState } from 'react';
import { FaCube, FaUser, FaClipboardList } from 'react-icons/fa'; // Import icons
import ProductsChart from "../../components/Admin/Charts/Products";
import UsersChart from "../../components/Admin/Charts/Users";
import OrdersChart from "../../components/Admin/Charts/Orders";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
} from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    // Fetch total products, users, and orders data from your backend
    // Example API call or calculation
    setTotalProducts(100);
    setTotalUsers(50);
    setTotalOrders(200);
  }, []);

  const data = [
    { index: 1, orderid: 'ORD001', user: 'John Doe', products: 'Product A, Product B', paymentStatus: 'Paid' },
    { index: 2, orderid: 'ORD002', user: 'Jane Smith', products: 'Product C', paymentStatus: 'Pending' },
    { index: 3, orderid: 'ORD003', user: 'Alice Johnson', products: 'Product D, Product E', paymentStatus: 'Failed' },
    // Add more rows as needed
  ];

  return (
    <div className="mx-4">
      <h1 className="text-3xl font-semibold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-900 text-white rounded-lg p-6 flex items-center justify-between">
          <div className="flex items-center">
            <FaCube className="text-3xl mr-4" />
            <div>
              <div className="text-sm text-gray-500">Total Products</div>
              <div className="text-2xl font-bold">{totalProducts}</div>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 text-white rounded-lg p-6 flex items-center justify-between">
          <div className="flex items-center">
            <FaUser className="text-3xl mr-4" />
            <div>
              <div className="text-sm text-gray-500">Total Users</div>
              <div className="text-2xl font-bold">{totalUsers}</div>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 text-white rounded-lg p-6 flex items-center justify-between">
          <div className="flex items-center">
            <FaClipboardList className="text-3xl mr-4" />
            <div>
              <div className="text-sm text-gray-500">Total Orders</div>
              <div className="text-2xl font-bold">{totalOrders}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-2 mt-8">
        <div className="bg-gray-900 text-white rounded-lg p-6 col-span-2">
          <h2 className="text-xl font-semibold mb-4">Orders Chart</h2>
          <OrdersChart />
        </div>
        <div className="bg-gray-900 text-white rounded-lg p-6 col-span-2">
          <h2 className="text-xl font-semibold mb-4">Users Chart</h2>
          <UsersChart />
        </div>
        <div className="bg-gray-900 text-white rounded-lg p-6 col-span-1">
          <h2 className="text-xl font-semibold mb-4">Products Chart</h2>
          <ProductsChart />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className='bg-gray-800 border-2 border-slate-100'>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-100 uppercase tracking-wider">Index</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-100 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-100 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-100 uppercase tracking-wider">Products</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-100 uppercase tracking-wider">Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{row.index}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{row.orderid}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{row.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{row.products}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    row.paymentStatus === 'Paid' ? 'text-green-500' : 
                    row.paymentStatus === 'Pending' ? 'text-yellow-500' : 
                    'text-red-500'
                  }`}>
                    {row.paymentStatus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
