import React, { useState, useEffect } from "react";
import axios from "axios";

import FileUpload from "./FileUpload";
import ColumnSelection from "./ColumnSelection";
import GraphVisualization from "./GraphVisualization";

const MainComponent = () => {
  const [file, setFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [columns, setColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (fileUploaded && selectedColumns.length > 0) {
      fetchData(selectedColumns);
    }
  }, [fileUploaded, selectedColumns]);

  // useEffect(() => {
  //   if (fileUploaded) {
  //     fetchColumns();
  //   }
  // }, [fileUploaded]);

  const handleFileUpload = async (file) => {
    try {
      if (!file.name.endsWith(".csv")) {
        throw new Error("Invalid file format. Please upload a CSV file.");
      }

      const formData = new FormData();
      formData.append("file", file);

      //upload file
      await axios.post("http://localhost:3000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully");
      setFile(file);
      fetchColumns(file);
      setFileUploaded(true);
    } catch (error) {
      console.error("Error uploading CSV file:", error);
      setError("Error uploading file");
    }
  };

  const fetchColumns = async (file) => {
    try {
      setLoading(true);
      setError(null);

      // Fetch column names from backend
      const response = await axios.get("http://localhost:3000/columns");

      setColumns(response.data.columns);
    } catch (error) {
      console.error("Error fetching columns:", error);
      setError("Error fetching columns");
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async (selectedColumns) => {
    try {
      setLoading(true);
      setError(null);

      // Fetch data for selected columns
      const response = await axios.get("http://localhost:3000/data", {
        params: { columns: selectedColumns.join(",") },
      });
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const handleDataSelected = (columns) => {
    setSelectedColumns(columns);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Battery-Cell Data Visualization Tool
      </h1>
      <FileUpload onFileUpload={handleFileUpload} />
      {loading && <p className="text-center mt-4">Loading columns...</p>}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {!loading && !error && fileUploaded && (
        <ColumnSelection
          columns={columns}
          onDataSelected={handleDataSelected}
        />
      )}
      {loading && <p className="text-center mt-4">Loading data...</p>}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {!loading && !error && fileUploaded && selectedColumns.length > 0 && (
        <GraphVisualization data={data} chartType="line" />
      )}
    </div>
  );
};

export default MainComponent;
