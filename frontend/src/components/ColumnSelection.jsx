import React, { useEffect, useState } from "react";

const ColumnSelection = ({ columns, onDataSelected }) => {
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [previewData, setPreviewData] = useState([]);

  console.log(columns);

  useEffect(() => {
    setSelectedColumns(columns.slice(0, 5));
  }, [columns]);

  useEffect(() => {
    setPreviewData(getPreviewData(selectedColumns));
  }, [selectedColumns]);

  const handleColumnToggle = (column) => {
    if (selectedColumns.includes(column)) {
      setSelectedColumns(selectedColumns.filter((col) => col !== column));
    } else {
      setSelectedColumns([...selectedColumns, column]);
    }
  };

  const getPreviewData = (selectedColumns) => {
    const preview = [];
    if (columns.length > 0) {
      for (let i = 0; i < Math.min(5, columns.length); i++) {
        const row = {};
        console.log(selectedColumns);
        selectedColumns.forEach((colName, index) => {
          row[colName] = columns[index];
        });
        preview.push(row);
      }
    }
    console.log(preview);
    return preview;
  };

  const handleVisualizeData = () => {
    onDataSelected(selectedColumns);
  };
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Column Selection</h2>
      <div className="flex flex-wrap gap-4">
        {columns.map((column, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-md focus:outline-none ${
              selectedColumns.includes(column)
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleColumnToggle(column)}
          >
            {column}
          </button>
        ))}
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Data Preview</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              {selectedColumns.map((column) => (
                <th key={column.name} className="border border-gray-300 p-2">
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {previewData.map((row, index) => (
              <tr key={index}>
                {selectedColumns.map((column) => (
                  <td
                    key={`${column}-${index}`}
                    className="border border-gray-300 p-2"
                  >
                    {row[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={handleVisualizeData}
        >
          Visualize Data
        </button>
      </div>
    </div>
  );
};

export default ColumnSelection;
