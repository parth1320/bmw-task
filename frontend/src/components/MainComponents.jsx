import React, { useState, useEffect } from "react";
import FileUpload from "./FileUpload";
import ScatterComponent from "./ScatterComponent";
import LineComponent from "./LineComponent";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { GetAllChartData, UploadImage } from "../redux/features/ChartService";
import _ from "lodash";
import Loader from "./Common/Loader";

const colorsSecond = [
  "#077600",
  "#ffc107",
  "#550059",
  "rgba(153,153,153,1)",
  "rgba(0,0,0,1)",
];

const colorsHoverSecond = [
  "#008ffb",
  "#00e396",
  "#550059",
  "rgba(153,153,153,1)",
  "rgba(0,0,0,1)",
];

const MainComponent = () => {
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(false);
  const [isChartData, setChartData] = useState(null);
  const [isTime, setTime] = useState(false);
  const [isChartShow, setChartShow] = useState({
    line: false,
    scatter: false,
  });
  const { getChartListData, loading } = useSelector((state) => state.charts);

  const handleFileUpload = async (file) => {
    // setLoading(true);
    try {
      if (!file.name.endsWith(".csv")) {
        throw new Error("Invalid file format. Please upload a CSV file.");
      }
      const formData = new FormData();
      formData.append("file", file);
      const res = await dispatch(UploadImage({ data: formData }));
      if (res?.type === "charts/UploadImage/fulfilled") {
        await dispatch(GetAllChartData());
        setChartShow({
          line: true,
          scatter: false,
        });
      } else if (res?.type === "charts/UploadImage/rejected") {
        toast.error(`Error uploading CSV file`, { autoClose: 3000 });
      }
      // setLoading(false);
    } catch (error) {
      toast.error(`Error uploading CSV file: ${error}`, { autoClose: 3000 });
      // console.error("Error uploading CSV file:", error);
      // setLoading(false);
    }
  };

  const handleSelectChart = (e, text) => {
    e.preventDefault();
    setChartShow({
      line: text === "line",
      scatter: text === "scatter",
    });
  };

  const getAllChartsOptionData = async (dataChart, colors) => {
    if (dataChart) {
      const returnDataChartData = await _.map(
        Object.keys(dataChart),
        (key, index) => {
          const quarterlyData = _.map(
            dataChart[key],
            (item) => Object.values(item)[0],
          );
          return {
            label: key,
            backgroundColor: colors?.color[index],
            borderColor: colors?.color[index],
            borderWidth: 1,
            hoverBackgroundColor: colors?.colorHover[index],
            hoverBorderColor: colors?.colorHover[index],
            data: quarterlyData,
            datalabels: {
              display: false,
            },
          };
        },
      );
      return returnDataChartData;
    }
  };

  useEffect(() => {
    if (!isTime) {
      getChartOption(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getChartListData]);

  const getChartOption = async (checkTimeCycle) => {
    if (getChartListData.length) {
      const cycles = _.map(getChartListData, (data) => data.cycle_number);
      const times = _.map(getChartListData, (data) => data.time);
      const dataQuterlyVisit = await {
        Current: _.map(getChartListData, (data) => {
          return { current: data.current };
        }),
        Voltage: _.map(getChartListData, (data) => {
          return { voltage: data.voltage };
        }),
        Capacity: _.map(getChartListData, (data) => {
          return { current: data.capacity };
        }),
      };
      const visitData = {
        labels: checkTimeCycle ? times : cycles,
        data: await getAllChartsOptionData(dataQuterlyVisit, {
          color: colorsSecond,
          colorHover: colorsHoverSecond,
        }),
      };
      setChartData(visitData);
    }
  };

  const toggleXaxes = () => {
    setTime(!isTime);
    getChartOption(!isTime);
  };

  return (
    <>
      <div className="container mx-auto">
        {loading ? <Loader /> : <></>}
        <div className="row">
          <h1 className="text-2xl font-bold mb-4 text-center my-5">
            Battery-Cell Data Visualization Tool
          </h1>
          <div className="mx-auto my-5 col-start-2 col-span-4 gap-4  text-center">
            <FileUpload onFileUpload={handleFileUpload} />
            <div className="my-5">
              {getChartListData?.length ? (
                <>
                  <button
                    type="button"
                    className={`${
                      isChartShow?.line
                        ? "bg-green-500 hover:bg-green-400 border-green-700 hover:border-green-500"
                        : "bg-blue-500 hover:bg-blue-400 border-blue-700 hover:border-blue-500"
                    }  text-white font-bold py-2 px-28 border-b-4 rounded m-2`}
                    onClick={(e) => {
                      handleSelectChart(e, "line");
                    }}
                  >
                    {" "}
                    Line
                  </button>
                  <button
                    type="button"
                    className={`${
                      isChartShow?.scatter
                        ? "bg-green-500 hover:bg-green-400 border-green-700 hover:border-green-500"
                        : "bg-blue-500 hover:bg-blue-400 border-blue-700 hover:border-blue-500"
                    }  text-white font-bold py-2 px-28 border-b-4 rounded m-2`}
                    onClick={(e) => {
                      handleSelectChart(e, "scatter");
                    }}
                  >
                    Scatter
                  </button>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          {isChartShow?.scatter && getChartListData?.length ? (
            <ScatterComponent isChartData={isChartData} />
          ) : isChartShow?.line && getChartListData?.length ? (
            <LineComponent isChartData={isChartData} />
          ) : (
            <></>
          )}
          {(isChartShow?.scatter || isChartShow?.line) &&
          getChartListData?.length ? (
            <div className="mx-auto my-5 col-start-2 col-span-4 gap-4  text-center">
              <button
                onClick={toggleXaxes}
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 mb-40 mt-5 text-center border-blue-700 hover:border-blue-500 rounded w-52"
              >
                {isTime ? "Cycle-Number" : "Time"}
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default MainComponent;
