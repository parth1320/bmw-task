import React, { useEffect, useState } from "react";
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
import { Line } from "react-chartjs-2";
import axios from "axios";
import _ from "lodash";
import ScatterComponent from "./components/ScatterComponent";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export function App() {
  const [datas, setDatas] = useState([]);
  const [isChartData, setChartData] = useState(null);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  // const labels = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  // ];

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (datas.length) {
      const { cycle_number, capacity, voltage, current } = _.reduce(
        datas,
        (acc: any, item) => {
          if ("current" in item) {
            acc.current.push(item.current);
          }
          if ("voltage" in item) {
            acc.voltage.push(item.voltage);
          }

          acc.capacity.push(item.capacity);
          acc.cycle_number.push(item.cycle_number);
          return acc;
        },
        { capacity: [], cycle_number: [], voltage: [], current: [] },
      );

      // console.log(bothValue, "AAAAAAAAAAAAAAAAstdssdgAAA");

      let data: any = {
        labels: cycle_number,
        datasets: [
          {
            label: "CAPACITY",
            data: capacity,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      };

      if (current?.length) {
        data = {
          ...data,
          responsive: true,
          datasets: [
            ...data.datasets, // Keep existing datasets
            {
              label: "CURRENT",
              data: current,
              borderColor: "rgb(237, 160, 26)",
              backgroundColor: "rgba(54, 162, 235, 0.5)",
            },
          ],
        };
      }

      if (voltage?.length) {
        data = {
          ...data,
          responsive: true,
          datasets: [
            ...data.datasets, // Keep existing datasets
            {
              label: "VOLTAGE",
              data: voltage,
              borderColor: "rgb(54, 162, 235)",
              backgroundColor: "rgba(54, 162, 235, 0.5)",
            },
          ],
        };
      }

      setChartData(data);
    }
  }, [datas]);

  const fetchData = async () => {
    try {
      // setLoading(true);
      // setError(null);

      // Fetch column names from backend
      const response = await axios.get("http://localhost:3000/allData");
      // console.log(response.data);

      setDatas(response.data);
      // setColumns(response.data.columns);
    } catch (error) {
      console.error("Error fetching columns:", error);
      // setError("Error fetching columns");
    } finally {
      // setLoading(false);
    }
  };

  return (
    <>
      <div>
        <select>
          <option value={1}>time</option>
          <option value={2}>time</option>
        </select>
      </div>
      <div>{isChartData && <Line options={options} data={isChartData} />}</div>
      {/* <ScatterComponent /> */}
    </>
  );
}
