import React, { useCallback } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

// Register necessary Chart.js components and plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
);

type LineChartProps = {
  isChartData: any;
}

// LineChart receives isChartData as props
const LineChart = ({ isChartData }: LineChartProps) => {
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

  // Render component with reset zoom button and Line chart
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
      <div className="w-100">
        {/* Render Line chart if isChartData exists */}
        {isChartData && (
          <>
            <Line
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
                    text: "Line Chart",
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
        )}
      </div>
    </>
  );
};

export default LineChart;
