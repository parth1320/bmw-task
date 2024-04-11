import React, { useState, useEffect } from "react";
import ScatterChart from "./ScatterChart";
import LineChart from "./LineChart";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  GetAllChartData,
  UploadImage,
} from "../../redux/features/ChartService";
import _ from "lodash";
import Loader from "../Common/Loader";
import { convertArrayToTwoDigitTime } from "../Common/TimeConversion";
import FileUpload from "../Common/FileUpload";

// Color schemes for chart elements
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

// MainComponent responsible for rendering charts and managing data
const Charts = () => {
  const dispatch = useDispatch();

  // State variables to manage chart data and display options
  const [isChartData, setChartData] = useState<any>(null);
  const [isTime, setTime] = useState<Boolean>(false);
  const [isChartShow, setChartShow] = useState<any>({
    line: false,
    scatter: false,
  });
  // Redux state and action for chart data and loading status
  const { getChartListData, loading } = useSelector(
    (state: any) => state.charts,
  );

  // Function to handle file upload
  const handleFileUpload = async (file: any) => {
    try {
      if (!file.name.endsWith(".csv")) {
        throw new Error("Invalid file format. Please upload a CSV file.");
      }
      const formData = new FormData();
      console.log(formData);

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
    } catch (error) {
      toast.error(`Error uploading CSV file: ${error}`, { autoClose: 3000 });
    }
  };

  // Function to handle chart selection
  const handleSelectChart = (e: any, text: string) => {
    e.preventDefault();
    setChartShow({
      line: text === "line",
      scatter: text === "scatter",
    });
  };

  // Function to format chart data for rendering
  const getAllChartsOptionData = async (dataChart: object, colors: any) => {
    if (dataChart) {
      const returnDataChartData = await _.map(
        Object.keys(dataChart),
        (key: string, index: number) => {
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

  // Function to fetch chart data and configure options
  const getChartOption = async (checkTimeCycle: boolean) => {
    if (getChartListData.length) {
      const cycles = _.map(getChartListData, (data: any) => data.cycle_number);
      const timeData = _.map(getChartListData, (data: any) => data.time);
      const times = convertArrayToTwoDigitTime(timeData);
      const dataQuterlyVisit = await {
        Current: _.map(getChartListData, (currentData: any) => {
          return { current: currentData?.current };
        }),
        Voltage: _.map(getChartListData, (voltageData: any) => {
          return { voltage: voltageData.voltage };
        }),
        Capacity: _.map(getChartListData, (capacityData: any) => {
          return { capacity: capacityData.capacity };
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

  // Function to toggle X-axis data between Time and Cycle Number
  const toggleXaxes = () => {
    setTime(!isTime);
    getChartOption(!isTime);
  };

  // Render component with file upload, chart selection buttons, and chart components
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
            <ScatterChart isChartData={isChartData} />
          ) : isChartShow?.line && getChartListData?.length ? (
            <LineChart isChartData={isChartData} />
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

export default Charts;
