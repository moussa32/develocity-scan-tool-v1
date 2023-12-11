import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../config/axiosconfig";

export const fetchTransaction = createAsyncThunk(
  "transaction/fetchTransaction",
  async ({ contractAddress, network }) => {
    const methodByNetwork = () => {
      switch (network) {
        case "BSC":
          return "getBSCTransaction";
        case "ETH":
          return "getETHTransaction";
        case "MATIC":
          return "getPolygonTransaction";
      }
    };

    const response = await instance.get(`contract/${methodByNetwork()}`, {
      params: {
        contractAddress,
      },
    });
    return response.data.result;
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transaction: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [fetchTransaction.fulfilled]: (state, action) => {
      state.transaction = action.payload;
      state.loading = "success";
    },
    [fetchTransaction.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.transaction = action.payload;
    },
    [fetchTransaction.rejected]: (state, action) => {
      state.loading = "failed";
      state.error = action.payload;
    },
  },
});

export default transactionSlice.reducer;
