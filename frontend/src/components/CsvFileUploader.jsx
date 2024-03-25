import React, { useState } from "react";

const CsvFileUploader = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["text/csv"];

    if (file && allowedTypes.includes(file.type)) {
      setSelectedFile(file);
      setError("");
    } else {
      setSelectedFile(null);
      setError("Please select a valid CSV file.");
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("csvfile", selectedFile);
      onUpload(formData);
      setSelectedFile(null);
    } else {
      setError("Please select a CSV file to upload.");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <label className="block mb-2">
        <span className="text-gray-700">Upload CSV File:</span>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </label>
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleUpload}
        className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded-md shadow-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
      >
        Upload
      </button>
    </div>
  );
};

export default CsvFileUploader;
