import axios from "axios";
import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';

export const fetchTokenInfoResult=createAsyncThunk('tokeninfo/fetchTokenInfoResult',
    async({contractAddress,ipaddress},  { dispatch, getState })=>{
        const response= await axios.get(`https://api.develocity.finance/api/v1/contract/tokenInfo?contractAddress=${contractAddress}&ipAddress=${ipaddress}&contractType=Binance`) 
        return response.data
    }
);

const Gettokeninfodata=createSlice({
    name:'tokeninfo',
    reducers:{

    },
    initialState:{
        data:[],
        status:null
    },
    extraReducers:{
        [fetchTokenInfoResult.fulfilled] : (state,{payload}) =>{
            state.data = payload;
            state.status = "success";

        },
        [fetchTokenInfoResult.pending] : (state) =>{
            state.status = "loading";

        },
        [fetchTokenInfoResult.rejected] : (state) =>{
            state.status = "failed";

        }
    }

})

export default Gettokeninfodata.reducer;
