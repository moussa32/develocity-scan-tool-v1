import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../config/axiosconfig";

export const fetchContractLockedLiquidity = createAsyncThunk(
  "contractLockedLiquidity/fetchContractLockedLiquidity",
  async contractAddress => {
    try {
      let response = await instance.get(`contract/lockedLiquidity`, {
        params: {
          contractAddress,
        },
      });
      return response;
    } catch (error) {
      return error.response.data;
    }
  }
);

const lockedLiquidity = createSlice({
  name: "contractLockedLiquidity",
  reducers: {},
  initialState: {
    data: [],
    status: null,
    responseCode: null,
  },
  extraReducers: {
    [fetchContractLockedLiquidity.fulfilled]: (state, { payload }) => {
      state.data = payload.result;
      state.status = "success";
      state.responseCode = payload?.responseCode;
    },
    [fetchContractLockedLiquidity.pending]: (state, { payload }) => {
      state.status = "loading";
      state.responseCode = payload?.responseCode;
    },
    [fetchContractLockedLiquidity.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.responseCode = payload?.responseCode;
    },
  },
});
export default lockedLiquidity.reducer;
