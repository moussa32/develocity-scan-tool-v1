import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../config/axiosconfig";

export const fetchContractInfoDetails = createAsyncThunk(
  "contractInfoDetails/fetchContractInfoDetails",
  async ({ contractAddress, network }) => {
    const methodByNetwork = () => {
      switch (network) {
        case "BSC":
          return "tokenInfo";
        case "ETH":
          return "ethTokenInfo";
        case "MATIC":
          return "polygonTokenInfo";
      }
    };

    const fetchIP = await axios.get("https://api.ipify.org?format=json").catch(error => {
      console.log(error);
    });
    const { ip } = fetchIP.data;

    const fetchContractNetwork = await instance.get(`static/getContractNetwork/${contractAddress}`).catch(error => {
      console.log(error);
    });

    const response = await instance
      .get(`contract/${methodByNetwork()}`, {
        params: {
          ipAddress: ip,
          contractAddress: contractAddress,
        },
      })
      .catch(error => {
        console.log(error);
      });

    const contractInfoDetails = {
      ...response.data,
      result: { ...response.data.result, networks: fetchContractNetwork.data.networks },
    };

    return contractInfoDetails;
  }
);

const contractInfoDetailsSlice = createSlice({
  name: "contractInfoDetails",
  reducers: {},
  initialState: {
    data: [],
    status: null,
  },
  extraReducers: {
    [fetchContractInfoDetails.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.status = "success";
    },
    [fetchContractInfoDetails.pending]: state => {
      state.status = "loading";
    },
    [fetchContractInfoDetails.rejected]: state => {
      state.status = "failed";
    },
  },
});

export default contractInfoDetailsSlice.reducer;
