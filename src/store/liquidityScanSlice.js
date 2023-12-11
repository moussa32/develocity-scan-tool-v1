import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../config/axiosconfig";

export const fetchLiquidityScan = createAsyncThunk(
  "liquidityScan/fetchLiquidityScan",
  async ({ contractAddress, network }) => {
    const methodByNetwork = () => {
      switch (network) {
        case "BSC":
          return "getBscLiquidityScan";
        case "ETH":
          return "getETHLiquidityScan";
        case "MATIC":
          return "getPoygonLiquidityScan";
      }
    };

    const response = await instance.get(`contract/${methodByNetwork()}/${contractAddress}`);
    return response.data.result;
  }
);

const liquidityScanSlice = createSlice({
  name: "liquidityScan",
  initialState: {
    liquidity: null,
    loading: false,
    error: null,
  },
  extraReducers: {
    [fetchLiquidityScan.fulfilled]: (state, action) => {
      state.liquidity = action.payload;
      state.loading = "success";
    },
    [fetchLiquidityScan.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.liquidity = action.payload;
    },
    [fetchLiquidityScan.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default liquidityScanSlice.reducer;
