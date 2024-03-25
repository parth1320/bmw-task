import { Chart } from "chart.js";
import React, { useEffect, useRef } from "react";

const DataVisualization = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data) {
      const ctx = chartRef.current.getContext("2D");
      new Chart(ctx, {
        type: "line",
        data: {
          lables: data.map((entry) => entry.cycle_number),
          datasets: [
            {
              label: "Voltage",
              data: data.map((entry) => entry.voltage),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default DataVisualization;
