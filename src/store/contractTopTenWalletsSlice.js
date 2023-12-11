import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../config/axiosconfig";

export const fetchTopTenWallets = createAsyncThunk("wallet/fetchTopTenWallets", async tokenAddress => {
  const response = await instance.get(`contract/getBSCTop10?contractAddress=${tokenAddress}`);
  return response.data.result;
});

const contractTopTenWallets = createSlice({
  name: "topTenWallets",
  initialState: {
    contractTopTenWallets: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [fetchTopTenWallets.fulfilled]: (state, action) => {
      state.contractTopTenWallets = action.payload;
    },
    [fetchTopTenWallets.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.contractTopTenWallets = action.payload;
    },
    [fetchTopTenWallets.rejected]: (state, action) => {
      state.loading = "failed";
      state.error = action.payload;
    },
  },
});

export default contractTopTenWallets.reducer;
