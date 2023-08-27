import { configureStore } from "@reduxjs/toolkit";
import SearchReducer from "./FetchSearchData";
import contractAnalysisReducer from "./contractAnalysisSlice";
import contractInfoDetailsReducer from "./contractInfoDetailsSlice";
import contractTaxSliceReducer from "./contractTaxSlice";
import GetListNewsdataReducer from "./FetchListNews";
import GetAdvertismentodataReducer from "./FetchAdvertisment";
import ScoreReducer from "./FetchTrustScoreData";
import DistReducer from "./FetchDistributionData";
import lockedLiquidityReducer from "./contractlockedLiquidity";
import tokenOwnerSlice from "./tokenOwnerSlice";
import topWalletSlice from "./topWalletSlice";
import liquidityScanSlice from "./liquidityScanSlice";
import transactionSlice from "./transactionSlice";
import tokenListSlice from "./tokenListSlice";
import GetIPReducer from "./FetchIPAddress";

export const store = configureStore({
  reducer: {
    Search: SearchReducer,
    contractInfoDetails: contractInfoDetailsReducer,
    contractAnalysis: contractAnalysisReducer,
    contractTax: contractTaxSliceReducer,
    Score: ScoreReducer,
    Dist: DistReducer,
    tokenOwner: tokenOwnerSlice,
    topWallet: topWalletSlice,
    liquidityScan: liquidityScanSlice,
    transaction: transactionSlice,
    tokenList: tokenListSlice,
    GetListNewsdata: GetListNewsdataReducer,
    GetAdvertismentodata: GetAdvertismentodataReducer,
    GetIPAddress: GetIPReducer,
    lockedLiquidity: lockedLiquidityReducer,
  },
});
