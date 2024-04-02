import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const ScatterComponent = () => {
  const [datas, setDatas] = useState([]);
  const [scatterData, setScatterData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (datas.length) {
      const filteredData = datas.map((item) => ({
        x: item.voltage,
        y: item.current,
      }));
      setScatterData(filteredData);
    }
  }, [datas]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/allData");
      setDatas(response.data);
    } catch (error) {
      console.error("Error fetching columns:", error);
    }
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const data = {
    datasets: [
      {
        label: "A dataset",
        data: scatterData,
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };
  return (
    <>
      <Scatter options={options} data={data} />;
    </>
  );
};

export default ScatterComponent;
