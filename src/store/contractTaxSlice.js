import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../config/axiosconfig";

export const fetchContractTax = createAsyncThunk("tax/fetchContractTax", async ({ contractAddress, network }) => {
  const methodByNetwork = () => {
    switch (network) {
      case "BSC":
        return "buySellBSCFeePercentage";
      case "ETH":
        return "buySellFeeETHPercentage";
    }
  };

  const response = await instance.get(`contract/${methodByNetwork()}`, {
    params: {
      contractAddress,
    },
  });
  return response.data;
});

const contractTaxSlice = createSlice({
  name: "contractTax",
  reducers: {},
  initialState: {
    data: [],
    status: null,
  },
  extraReducers: {
    [fetchContractTax.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.status = "success";
    },
    [fetchContractTax.pending]: state => {
      state.status = "loading";
    },
    [fetchContractTax.rejected]: state => {
      state.status = "failed";
    },
  },
});

export default contractTaxSlice.reducer;
