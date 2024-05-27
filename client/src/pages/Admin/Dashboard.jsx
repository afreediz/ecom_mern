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
    </div>
  )
}

export default Dashboard
