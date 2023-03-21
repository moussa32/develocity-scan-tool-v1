import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../config/axiosconfig";

export const fetchTokenInfoResult = createAsyncThunk(
  "tokeninfo/fetchTokenInfoResult",
  async (contractAddress, { dispatch, getState }) => {
    const fetchIP = await axios.get("https://api.ipify.org?format=json");
    const { ip } = fetchIP.data;

    const response = await instance.get(
      `contract/tokenInfo?contractAddress=${contractAddress}&ipAddress=${ip}&contractType=Binance`
    );
    return response.data;
  }
);

const GetTokenInfo = createSlice({
  name: "tokeninfo",
  reducers: {},
  initialState: {
    data: [],
    status: null,
  },
  extraReducers: {
    [fetchTokenInfoResult.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.status = "success";
    },
    [fetchTokenInfoResult.pending]: state => {
      state.status = "loading";
    },
    [fetchTokenInfoResult.rejected]: state => {
      state.status = "failed";
    },
  },
});

export default GetTokenInfo.reducer;
