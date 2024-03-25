import React, { useState } from "react";
import axios from "axios";
import CsvFileUploader from "./CsvFileUploader";
import DataVisualization from "./DataVisualization";

const MainComponent = () => {
  const [data, setData] = useState(null);

  const handleFileUpload = async (formData) => {
    try {
      const response = axios.post(`http://localhost:3000/upload`, formData);
      setData(response.data);
    } catch (error) {
      console.error("Error uploading CSV file:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Battery Cell Data Visualization
      </h1>
      <CsvFileUploader onUpload={handleFileUpload} />
      {data && <DataVisualization data={data} />}
    </div>
  );
};

export default MainComponent;
