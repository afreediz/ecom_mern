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
import ProductsChart from "../../components/Admin/Charts/Products"
import UsersChart from "../../components/Admin/Charts/Users";
import OrdersChart from "../../components/Admin/Charts/Orders";

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const Dashboard = () => {
  const data = [
    { index: 1, orderid: 'ORD001', user: 'John Doe', products: 'Product A, Product B', paymentStatus: 'Paid' },
    { index: 2, orderid: 'ORD002', user: 'Jane Smith', products: 'Product C', paymentStatus: 'Pending' },
    { index: 3, orderid: 'ORD003', user: 'Alice Johnson', products: 'Product D, Product E', paymentStatus: 'Failed' },
    // Add more rows as needed
  ];
  return (
    <div>
      <h1 className="mx-4">Dashboard</h1>
      <div className="numbers grid grid-cols-4 gap-4">
        <div className="box bg-green-500 rounded-sm p-6">
          <div className="text">Total Products</div>
          <div className="number">100</div>
        </div>
        <div className="box bg-green-500 rounded-sm p-6">
          <div className="text">Total Products</div>
          <div className="number">100</div>
        </div>
        <div className="box bg-green-500 rounded-sm p-6">
          <div className="text">Total Products</div>
          <div className="number">100</div>
        </div>
        <div className="box bg-green-500 rounded-sm p-6">
          <div className="text">Total Products</div>
          <div className="number">100</div>
        </div>
      </div>
      <div className="charts grid grid-cols-5 gap-4">
        <div className="orders-chart col-span-2">
          <OrdersChart />
        </div>
        <div className="users-chart col-span-2">
          <UsersChart />
        </div>
        <div className="products-chart col-span-1">
          <ProductsChart />
        </div>
      </div>
      <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-md sm:rounded-lg">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Index
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Products
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.index}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.orderid}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.user}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.products}</td>
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
    </div>
    </div>
  )
}

export default Dashboard
