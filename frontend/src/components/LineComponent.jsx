import React from "react";
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

// LineComponent receives isChartData as props
const LineComponent = ({ isChartData }) => {
  const chartRef = React.useRef(null);

  // Function to handle resetting zoom on the chart
  const handleResetZoom = () => {
    if (chartRef && chartRef.current) {
      chartRef.current.resetZoom();
    }
  };
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
      <div>
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

export default LineComponent;
