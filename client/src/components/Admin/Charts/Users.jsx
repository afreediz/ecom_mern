import React, { useState } from 'react'
import { Bar } from "react-chartjs-2";

export const BarChart = ({ chartData }) => {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users per day"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
};


function UsersChart({users}) {
    const [chartData, setChartData] = useState({
      labels: users.map((user) => user.day),
      datasets: [
        {
          label: "Products",
          data: users.map((user) => user.number_of_users),
          backgroundColor: ["red", "green", "blue", "yellow"],
        },
      ],
    });
   
    return (
      <div className="App">
        <BarChart chartData={chartData} />
      </div>
    );
}

export default UsersChart;
