import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";






export default function LineChart({ labels, datasets }) {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  //console.log("LineChart");

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue("--text-color-secondary");
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    //console.log("useEffect");

    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
      animation: false,
      elements: {
        point: {
          radius: 0.05 // This sets the radius of the data points to 2
        }
      }
    };

    setChartOptions(options);

    const intervalId = setInterval(() => {
      //console.log("interval");
      const data = {
        labels: labels,
        datasets: [
          {
            label: datasets[0].label,
            data: datasets[0].data,
            fill: false,
            borderColor: documentStyle.getPropertyValue("--blue-500"),
            tension: 0.4,
            pointRadius: 0.05
          },
          {
            label: datasets[1].label,
            data: datasets[1].data,
            fill: false,
            borderColor: documentStyle.getPropertyValue("--pink-500"),
            tension: 0.4,
            pointRadius: 0.05
          },
        ],
      };
      setChartData(data);
    }, 10);

    return () => clearInterval(intervalId);
  }, [labels, datasets]);

  return (
    <div className="card">
      <Chart type="line" data={chartData} options={chartOptions} />
    </div>
  );
}