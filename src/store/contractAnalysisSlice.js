import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../config/axiosconfig";

export const fetchContractAnalysis = createAsyncThunk(
  "contractAnalysis/fetchContractAnalysis",
  async ({ contractAddress, network }) => {
    const methodByNetwork = () => {
      switch (network) {
        case "BSC":
          return "getBSCContractDetail";
        case "ETH":
          return "getETHContractDetails";
        case "MATIC":
          return "getPolygonContractDetails";
      }
    };

    const response = await instance.get(`contract/${methodByNetwork()}/${contractAddress}`);
    return response.data;
  }
);

const contractAnalysisSlice = createSlice({
  name: "contractAnalysis",
  reducers: {},
  initialState: {
    data: [],
    status: null,
  },
  extraReducers: {
    [fetchContractAnalysis.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.status = "success";
    },
    [fetchContractAnalysis.pending]: state => {
      state.status = "loading";
    },
    [fetchContractAnalysis.rejected]: state => {
      state.status = "failed";
    },
  },
});

export default contractAnalysisSlice.reducer;
