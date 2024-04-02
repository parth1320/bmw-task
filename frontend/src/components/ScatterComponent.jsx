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
  const [transformData, setTransformData] = useState(null);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    fetchData();
  });
  console.log(datas);
  if (datas.length) {
    const filteredData = datas.map((item) => ({
      x: item.capacity,
      y: item.cycle_number,
    }));
    const data = {
      datasets: [
        {
          label: "A dataset",
          data: filteredData,
          backgroundColor: "rgba(255, 99, 132, 1)",
        },
      ],
    };

    setTransformData(data);
  }

  console.log(transformData);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/allData");
      setDatas(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching columns:", error);
    }
  };

  return (
    <>
      <Scatter options={options} data={transformData} />;
    </>
  );
};

export default ScatterComponent;
