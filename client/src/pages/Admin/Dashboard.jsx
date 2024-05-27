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
      <div className="charts grid grid-cols-2 gap-4">
        <div className="orders-chart"></div>
        <div className="users-chart"></div>
        <div className="products-chart"></div>
      </div>
    </div>
  )
}

export default Dashboard
