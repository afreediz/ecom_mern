import React, { useState } from "react";
import { Line } from "react-chartjs-2";

function LineChart({ chartData }) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Line Chart</h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
}
function OrdersChart({orders}){
    const [chartData, setChartData] = useState({
        labels: orders.map((order) => order.day),
        datasets: [
          {
            label: "Orders",
            data: orders.map((order) => order.number_of_orders),
            backgroundColor: ["red", "green", "blue", "yellow"],
          },
        ],
      });
     
      return (
        <div className="App">
          <LineChart chartData={chartData} />
        </div>
      );
}

export default OrdersChart
