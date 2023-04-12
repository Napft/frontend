import React from "react";
import { Line } from "react-chartjs-2";
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';

Chart.register(CategoryScale);




const NFTChartSection = ({ data }) => {
  // data = [
  //   { x: "2010-01-01", y: 10 },
  //   { x: "2011-01-01", y: 20 },
  //   { x: "2012-01-01", y: 25 },
  //   { x: "2013-01-01", y: 15 },
  //   { x: "2014-01-01", y: 26 },
  //   { x: "2015-01-01", y: 35 },
  //   { x: "2017-01-01", y: 30 },
  //   { x: "2018-01-01", y: 35 },
  //   { x: "2019-01-01", y: 40 },
  //   { x: "2020-01-01", y: 34 },
  //   { x: "2021-01-01", y: 31 },
  //   { x: "2022-01-01", y: 49 },
  //   { x: "2023-01-01", y: 52 },
  //   { x: "2024-01-01", y: 53 },
  //   { x: "2025-01-01", y: 58 },
  //   { x: "2026-01-01", y: 62 },
  //   { x: "2027-01-01", y: 61 },
  //   { x: "2028-01-01", y: 67 },
  // ];
  const yls = data.map(a=>a.y);
  const mn = (yls.reduce((a, b) => a + b, 0) / yls.length)/3;
  const options = {

    scales: {
      x: {
        ticks: {
          color: "#fff7"
        },
        grid: {
          color: '#fff4',
          borderColor: 'red'
        }
      },
      y: {
        min:Math.min(...yls)-mn,
        max:Math.max(...yls)+mn,
        ticks: {
          color: "#fff7",
          // stepSize:1,
        },
        grid: {
          color: '#fff4',
          borderColor: 'green'  // <-- this line is answer to initial question
        },
        title: {
          display: true,
          text: 'Price in ETH',
          color:"#fff"
        }  
      },
    },
  };

  const chartData = {
    datasets: [
      {
        label: "Price",
        data: data.map((d) => ({ x: d.x, y: d.y })),
      },
    ],
  };
  return (
    <div style={{ color: "black", height: "500px", backgroundColor: "#fff2", borderRadius: "20px", padding: "20px" }}>
      <Line
        data={chartData}
        options={options}
      />
    </div>
  );
};


export default NFTChartSection