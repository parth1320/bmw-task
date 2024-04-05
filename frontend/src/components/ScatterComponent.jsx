import React, { useCallback } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";

// Register necessary Chart.js components and plugins
ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  zoomPlugin,
);

// ScatterComponent renders a scatter chart and a reset zoom button
const ScatterComponent = ({ isChartData }) => {
  const chartRef = React.useRef(null);

  // Function to handle resetting zoom on the chart
  const handleResetZoom = () => {
    if (chartRef && chartRef.current) {
      chartRef.current.resetZoom();
    }
  };

  // Function to download image of the chart
  const downloadImage = useCallback(() => {
    const link = document.createElement("a");
    link.download = "chart.png";
    link.href = chartRef.current.toBase64Image();
    link.click();
  }, []);

  // Render component with reset zoom button and Scatter chart
  return (
    <>
      {/* Button to reset zoom */}
      <button
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        onClick={handleResetZoom}
      >
        Reset Zoom
      </button>
      <button
        className="bg-white hover:bg-gray-100 ms-3 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        onClick={downloadImage}
      >
        Download
      </button>
      <Scatter
        ref={chartRef}
        data={{
          labels: isChartData?.labels,
          datasets: isChartData?.data,
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Scatter Chart",
            },
            zoom: {
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: "xy",
              },
            },
          },
        }}
      />
    </>
  );
};

export default ScatterComponent;
