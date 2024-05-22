import React, { useState } from 'react'
import { Pie } from "react-chartjs-2";

function PieChart({ chartData }) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Products per category"
            }
          }
        }}
      />
    </div>
  );
}

function ProductsChart({products}) {
  console.log(products);
    const [chartData, setChartData] = useState({
      labels: products.map((product) => product.category),
      datasets: [
        {
          label: "Products",
          data: products.map((product) => product.number_of_products),
          backgroundColor: ["red", "green", "blue", "yellow", "purple"],
        },
      ],
    });
   
    return (
      <div className="App">
        <PieChart chartData={chartData} />
      </div>
    );
}

export default ProductsChart;