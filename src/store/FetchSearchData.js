// import axios from 'axios';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../config/axiosconfig";

const isContractInfoEmpty = contractInfoObject => Object.keys(contractInfoObject).length === 0;

export const fetchResult = createAsyncThunk("search/fetchResult", async searchKey => {
  try {
    const response = await instance.get(`user/suggestion?name=${searchKey}`);
    const filteredDataResults = response.data.result.filter(item => !isContractInfoEmpty(item.contractInfo));

    return { ...response.data, result: filteredDataResults };
  } catch (error) {
    return error.response.data;
  }
});

export const fetchSearchParams = createAsyncThunk("search/fetchSearchParams", async searchKey => {
  try {
    // const responseSuggest = await instance.get(`user/suggestion?name=${searchKey}`)
    const responseSuggest = await instance.get(`contract/lockedLiquidity?contractAddress=${searchKey}`);

    return responseSuggest.data;
  } catch (err) {
    return err.response.data;
  }
});

const Search = createSlice({
  name: "search",
  reducers: {
    resetSearch: () => ({
      data: [],
      status: null,
      searchCode: null,
      suggestParamsData: [],
      statusParams: null,
    }),
  },
  initialState: {
    data: [],
    status: null,
    searchCode: null,
    suggestParamsData: [],
    statusParams: null,
  },
  extraReducers: {
    [fetchResult.fulfilled]: (state, payload) => {
      state.data = payload;
      state.status = "success";
      state.searchCode = payload.payload?.responseCode;
    },
    [fetchResult.pending]: (state, payload) => {
      state.status = "loading";
      state.searchCode = payload.payload?.responseCode;
    },
    [fetchResult.rejected]: (state, payload) => {
      state.status = "failed";
      state.searchCode = payload.payload?.responseCode;
    },
    // suggest for params
    [fetchSearchParams.fulfilled]: (state, { payload }) => {
      // ['responseCode', 'responseMessage']
      // console.log("payload fill: ",payload)
      state.statusParams = payload;
    },
    [fetchSearchParams.pending]: (state, { payload }) => {
      // console.log("payload: ",payload)
      state.statusParams = payload;
      // state.statusParams='loading'
    },
    [fetchSearchParams.rejected]: (state, { payload }) => {
      // console.log("payload reject: ",payload)
      state.statusParams = payload;
    },
  },
});

export const { resetSearch } = Search.actions;
export default Search.reducer;
