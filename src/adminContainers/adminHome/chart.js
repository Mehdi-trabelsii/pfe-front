import React, { useState, useEffect } from "react";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import axios from "axios";
import "../scss/chart.scss";

const Chart = () => {
  const [chartData, setChartData] = useState({});
  const [secondChartData, setSecondChartData] = useState({});

  const mychart = () => {
    setChartData({
      labels: ["monday", "tuesday", "wednesday", "thursday", "friday"],

      datasets: [
        {
          label: "level of thiccness",
          data: [32, 45, 12, 76, 69],

          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",
            "red",
            "blue",
            "green",
            "yellow",
          ],
        },
      ],
    });
  };
  const mySecondchart = () => {
    setSecondChartData({
      labels: ["monday", "tuesday", "wednesday", "thursday", "friday"],

      datasets: [
        {
          label: "level of thiccness",
          data: [32, 45, 12, 76, 69],

          backgroundColor: ["rgba(75, 192, 192, 0.6)","rgba(75, 192, 192, 0.6)","rgba(75, 192, 192, 0.6)","rgba(75, 192, 192, 0.6)","rgba(75, 192, 192, 0.6)"],
        },
      ],
    });
  };
  useEffect(() => {
    mychart();
    mySecondchart();
  }, []);
  return (
    <div className="container-chart">
      <div className="chart-one">
        <h1>Dankmemes</h1>
        <Bar  width={400}
  height={280} data={secondChartData} />
      </div>
        

      <div className="chart-two">
        <h1>Dankmemes</h1>
        <Doughnut width={500}
  height={280} data={chartData} />
      </div>
     
    </div>
  );
};

export default Chart;
