import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Charts from "./components/Charts";

export function App() {
  return (
    <>
      <Charts />
      <ToastContainer />
    </>
  );
}
