import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";

const FileUpload = ({ onFileUpload }) => {
  const { getChartListData } = useSelector((state) => state.charts);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "text/csv": [".csv"],
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      onFileUpload(file);
    },
  });

  return (
    <div
      {...getRootProps()}
      className="dropzone border border-dashed py-40 text-center cursor-pointer"
    >
      <input {...getInputProps()} />
      {getChartListData?.length ? (
        <div className="w-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            height="5rem"
            className="mx-auto"
          >
            <path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm-96 144c0 4.4-3.6 8-8 8h-8c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h8c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8h-8c-26.5 0-48-21.5-48-48v-32c0-26.5 21.5-48 48-48h8c4.4 0 8 3.6 8 8v16zm44.3 104H160c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h12.3c6 0 10.4-3.5 10.4-6.6 0-1.3-.8-2.7-2.1-3.8l-21.9-18.8c-8.5-7.2-13.3-17.5-13.3-28.1 0-21.3 19-38.6 42.4-38.6H200c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8h-12.3c-6 0-10.4 3.5-10.4 6.6 0 1.3 .8 2.7 2.1 3.8l21.9 18.8c8.5 7.2 13.3 17.5 13.3 28.1 0 21.3-19 38.6-42.4 38.6zM256 264v20.8c0 20.3 5.7 40.2 16 56.9 10.3-16.7 16-36.6 16-56.9V264c0-4.4 3.6-8 8-8h16c4.4 0 8 3.6 8 8v20.8c0 35.5-12.9 68.9-36.3 94.1-3 3.3-7.3 5.1-11.7 5.1s-8.7-1.9-11.7-5.1c-23.4-25.2-36.3-58.6-36.3-94.1V264c0-4.4 3.6-8 8-8h16c4.4 0 8 3.6 8 8zm121-159L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z" />
          </svg>
        </div>
      ) : (
        <h3>Drag 'n' drop a CSV file here, or click to select</h3>
      )}
    </div>
  );
};

export default FileUpload;
