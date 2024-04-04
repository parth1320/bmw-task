import React from "react";
import MainComponent from "./components/MainComponents";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function App() {
  return (
    <>
      <MainComponent />
      <ToastContainer />
    </>
  );
}
