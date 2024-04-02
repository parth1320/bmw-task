import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const GraphVisualization = ({ data, chartType }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data && chartRef.current) {
      const labels = data.map((entry, index) => index + 1);
      const datasets = Object.keys(data[0])
        .filter((key) => key !== "cycle_number")
        .map((key) => ({
          label: "key",
          data: data.map((entry) => entry[key]),
          borderColor: getRandomColor(),
          fill: false,
        }));

      const chartData = {
        labels,
        datasets,
      };

      const ctx = chartRef.current.getContext("2d");
      const chart = new Chart(ctx, {
        type: chartType,
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });

      return () => {
        chart.destroy();
      };
    }
  }, [data, chartType]);

  getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4"> Graph Visualization</h2>
      <canvas ref={chartRef} />
    </div>
  );
};

export default GraphVisualization;
