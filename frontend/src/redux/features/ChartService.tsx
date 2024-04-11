import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define the base URL for API requests
let url = "http://localhost:3300";
// Uncomment the line below to use the API URL from environment variables
// let url = process.env.REACT_APP_API_URL;

// Async thunk to fetch all chart data from the server
export const GetAllChartData: any = createAsyncThunk(
  "charts/GetAllChartData",
  async (_, { rejectWithValue }) => {
    try {
      const resp = await axios.get(`${url}/allData`);
      return resp.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

// Async thunk to upload an image file to the server
export const UploadImage: any = createAsyncThunk(
  "charts/UploadImage",
  async (args: any, { rejectWithValue }) => {
    try {
      const { data } = args;
      const resp = await axios.post(`${url}/upload`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return resp.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

// Create a slice for chart-related state management
const ChartSlice = createSlice({
  name: "charts",
  initialState: {
    error: false, // Flag for error state
    loading: false, // Flag for loading state
    getChartListData: [], // Array to store chart data
  },
  reducers: {
    setChartPage: (state: any, action: any) => {
      state.currentPage = action.payload; // Update current page in state
    },
  },

  // Define extra reducers for handling async actions
  extraReducers: (builder) => {
    builder
      .addCase(GetAllChartData.pending, (state) => {
        state.loading = true; // Set loading state while fetching data
      })
      .addCase(GetAllChartData.fulfilled, (state, action) => {
        state.loading = false; // Clear loading state on success
        state.getChartListData = action?.payload; // Store fetched data in state
      })
      .addCase(GetAllChartData.rejected, (state) => {
        state.loading = false; // Clear loading state on failure
      })
      .addCase(UploadImage.pending, (state) => {
        state.loading = true; // Set loading state while uploading image
      })
      .addCase(UploadImage.fulfilled, (state, action) => {
        state.loading = false; // Clear loading state on upload success
        // state.getChartListData = action?.payload;
      })
      .addCase(UploadImage.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Export action creators
export const { setChartPage } = ChartSlice.actions;

// Export the reducer function
export default ChartSlice.reducer;
