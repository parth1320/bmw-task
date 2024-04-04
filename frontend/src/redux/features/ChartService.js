import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let url = "http://localhost:3000";
// let url = process.env.REACT_APP_API_URL;

export const GetAllChartData = createAsyncThunk(
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

export const UploadImage = createAsyncThunk(
  "charts/UploadImage",
  async (args, { rejectWithValue }) => {
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

const ChartSlice = createSlice({
  name: "charts",
  initialState: {
    error: false,
    loading: false,
    getChartListData: [],
  },
  reducers: {
    setChartPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetAllChartData.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetAllChartData.fulfilled, (state, action) => {
        state.loading = false;
        state.getChartListData = action?.payload;
      })
      .addCase(GetAllChartData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(UploadImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(UploadImage.fulfilled, (state, action) => {
        state.loading = false;
        // state.getChartListData = action?.payload;
      })
      .addCase(UploadImage.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setChartPage } = ChartSlice.actions;

export default ChartSlice.reducer;
